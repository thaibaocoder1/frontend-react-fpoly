import { FaFacebookF, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const ProductSocial = () => {
  return (
    <ul className="flex justify-start items-center gap-3">
      <li>
        <a
          className="w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-indigo-500 rounded-full text-white"
          href="#"
        >
          <FaFacebookF />
        </a>
      </li>
      <li>
        <a
          className="w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-cyan-500 rounded-full text-white"
          href="#"
        >
          <FaTwitter />
        </a>
      </li>
      <li>
        <a
          className="w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-purple-500 rounded-full text-white"
          href="#"
        >
          <FaLinkedin />
        </a>
      </li>
      <li>
        <a
          className="w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-blue-500 rounded-full text-white"
          href="#"
        >
          <FaGithub />
        </a>
      </li>
    </ul>
  );
};

export default ProductSocial;
