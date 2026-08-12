param(
    [string]$TestimonialsPath = "data/testimonials.js",
    [string]$OutputDir = "public/images/testimonials/gardeners"
)

Add-Type -AssemblyName System.Drawing
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

function Convert-To-Slug {
    param([string]$Value)

    $normalized = $Value.ToLowerInvariant().Normalize([Text.NormalizationForm]::FormD)
    $builder = New-Object System.Text.StringBuilder

    foreach ($char in $normalized.ToCharArray()) {
        $category = [Globalization.CharUnicodeInfo]::GetUnicodeCategory($char)
        if ($category -ne [Globalization.UnicodeCategory]::NonSpacingMark) {
            [void]$builder.Append($char)
        }
    }

    return ($builder.ToString().Normalize([Text.NormalizationForm]::FormC) -replace '[^a-z0-9]+', '-' -replace '(^-|-$)', '')
}

function Get-GardenerNames {
    param([string]$Path)

    $content = Get-Content -LiteralPath $Path -Raw
    $match = [regex]::Match($content, 'export const gardenerstestimonials\s*=\s*\{[\s\S]*?items:\s*\[(?<items>[\s\S]*?)\]\s*,\s*\};')
    if (-not $match.Success) {
        throw "Could not find gardenerstestimonials.items in $Path"
    }

    return [regex]::Matches($match.Groups['items'].Value, 'name:\s*"(?<name>[^"]+)"') | ForEach-Object {
        $_.Groups['name'].Value
    }
}

function Save-SquarePhoto {
    param(
        [string]$SourcePath,
        [string]$OutputPath,
        [double]$CropYRatio = 0.24
    )

    $src = [System.Drawing.Image]::FromFile($SourcePath)
    $side = [Math]::Min($src.Width, $src.Height)
    $x = [Math]::Floor(($src.Width - $side) / 2)
    $y = [Math]::Floor(($src.Height - $side) * $CropYRatio)

    if ($y -lt 0) { $y = 0 }
    if (($y + $side) -gt $src.Height) { $y = $src.Height - $side }

    $dest = New-Object System.Drawing.Bitmap 512, 512
    $graphics = [System.Drawing.Graphics]::FromImage($dest)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    $graphics.DrawImage(
        $src,
        (New-Object System.Drawing.Rectangle 0, 0, 512, 512),
        (New-Object System.Drawing.Rectangle $x, $y, $side, $side),
        [System.Drawing.GraphicsUnit]::Pixel
    )

    $dest.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)

    $graphics.Dispose()
    $dest.Dispose()
    $src.Dispose()
}

# Curated realistic free-photo sources from Pexels. The output is parameterized by
# testimonial client name: each name is slugified and saved as <client-name>.png.
$photoSourcesBySlug = @{
    "paula-h"   = @{ Url = "https://images.pexels.com/photos/36729260/pexels-photo-36729260.jpeg?auto=compress&cs=tinysrgb&w=1000"; CropYRatio = 0.10 }
    "henrik-b"  = @{ Url = "https://images.pexels.com/photos/7125718/pexels-photo-7125718.jpeg?auto=compress&cs=tinysrgb&w=1000"; CropYRatio = 0.18 }
    "selma-t"   = @{ Url = "https://images.pexels.com/photos/20847144/pexels-photo-20847144.jpeg?auto=compress&cs=tinysrgb&w=1000"; CropYRatio = 0.12 }
    "dominik-w" = @{ Url = "https://images.pexels.com/photos/24022831/pexels-photo-24022831.jpeg?auto=compress&cs=tinysrgb&w=1000"; CropYRatio = 0.16 }
    "irina-k"   = @{ Url = "https://images.pexels.com/photos/6399528/pexels-photo-6399528.jpeg?auto=compress&cs=tinysrgb&w=1000"; CropYRatio = 0.10 }
    "lars-m"    = @{ Url = "https://images.pexels.com/photos/10678801/pexels-photo-10678801.jpeg?auto=compress&cs=tinysrgb&w=1000"; CropYRatio = 0.18 }
}

$resolvedOutputDir = Join-Path (Get-Location) $OutputDir
$tempDir = Join-Path $env:TEMP "craftwise-gardener-realistic-avatars"
New-Item -ItemType Directory -Force -Path $resolvedOutputDir | Out-Null
New-Item -ItemType Directory -Force -Path $tempDir | Out-Null

$client = New-Object System.Net.WebClient
$client.Headers.Add("User-Agent", "Mozilla/5.0")

$names = Get-GardenerNames $TestimonialsPath
foreach ($name in $names) {
    $slug = Convert-To-Slug $name
    if (-not $photoSourcesBySlug.ContainsKey($slug)) {
        throw "No realistic photo source configured for '$name' ($slug). Add a source URL to `$photoSourcesBySlug."
    }

    $source = $photoSourcesBySlug[$slug]
    $tempFile = Join-Path $tempDir "$slug.jpg"
    $outputPath = Join-Path $resolvedOutputDir "$slug.png"

    $client.DownloadFile($source.Url, $tempFile)
    Save-SquarePhoto -SourcePath $tempFile -OutputPath $outputPath -CropYRatio $source.CropYRatio
}

$client.Dispose()

Get-ChildItem -LiteralPath $resolvedOutputDir -Filter "*.png" | Select-Object Name, Length
