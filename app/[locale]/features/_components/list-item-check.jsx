import { FaCheckCircle } from 'react-icons/fa'

const ListItemCheck = ({ text }) => {
  return (
    <li className='flex items-center'>
      <FaCheckCircle className='text-primary mr-3 text-2xl w-5 shrink-0' />
      <span className='md:text-[20px] text-[16px] font-medium text-[#304C61]'>
        {text}
      </span>
    </li>
  )
}

export default ListItemCheck
