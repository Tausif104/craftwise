const TextBox = ({ title, description }) => {
  return (
    <div data-section>
      <h4 
        data-title
        className='lg:text-[22px] text-[18px] font-bold mb-4'
      >
        {title}
      </h4>
      <p 
        data-desc
        className='lg:text-[16px] text-[15px] leading-7'
      >
        {description}
      </p>
    </div>
  )
}

export default TextBox