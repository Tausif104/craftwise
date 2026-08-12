import { AppStoreBadge, PlayStoreBadge } from "./store-badge";

const DownloadFooter = ({ locale = "de" }) => {
  const isDe = locale === "de";
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 py-16 lg:py-24">
        <div className="relative overflow-hidden rounded-[28px] lg:rounded-[40px] bg-secondary p-8 sm:p-12 lg:p-16 text-white">
          {/* glow accents */}
          <div className="pointer-events-none absolute -top-20 -right-16 w-72 h-72 bg-primary/30 blur-3xl rounded-full" aria-hidden />
          <div className="pointer-events-none absolute -bottom-24 -left-16 w-72 h-72 bg-white/10 blur-3xl rounded-full" aria-hidden />

          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-8 lg:gap-12">
            <div>
              <h2 className="text-[26px] sm:text-[32px] lg:text-[40px] font-bold leading-tight">
                {isDe ? "CraftWise auf dein Smartphone holen" : "Get CraftWise on your phone."}
              </h2>
              <p className="text-white/80 text-base lg:text-lg mt-3 max-w-xl">
                {isDe
                  ? "Scanne den QR-Code, lade die App herunter und nimm deinen Betrieb überall mit hin."
                  : "Scan the QR code to download the app and take your business wherever the job takes you."}
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <AppStoreBadge href="#" topText={isDe ? "Laden im" : "Download on the"} />
                <PlayStoreBadge href="#" topText={isDe ? "Erhältlich bei" : "Get it on"} />
              </div>
            </div>

            {/* QR card */}
            <div className="lg:justify-self-end">
              <div className="bg-white rounded-3xl p-5 w-fit shadow-2xl">
                <div className="w-40 h-40 rounded-2xl bg-white grid grid-cols-8 grid-rows-8 gap-[2px] overflow-hidden">
                  {Array.from({ length: 64 }).map((_, i) => {
                    const corner =
                      (i < 3) ||
                      (i >= 8 && i <= 10) ||
                      (i >= 16 && i <= 18) ||
                      (i >= 5 && i <= 7) ||
                      (i >= 13 && i <= 15) ||
                      (i >= 21 && i <= 23) ||
                      (i >= 40 && i <= 42) ||
                      (i >= 48 && i <= 50) ||
                      (i >= 56 && i <= 58);
                    const noise = (i * 37) % 9 < 4;
                    return (
                      <div
                        key={i}
                        className={corner || noise ? "bg-[#0A1B28]" : "bg-white"}
                      />
                    );
                  })}
                </div>
                <p className="text-[#0A1B28] text-xs font-semibold text-center mt-3">
                  {isDe ? "Zum Installieren scannen" : "Scan to install"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadFooter;
