import Breadcrumb from '@/components/base/Breadcrumb';
import { Rakkas } from 'next/font/google';
import { FaRegEdit } from 'react-icons/fa';
import { GrDatabase } from 'react-icons/gr';
import { IoAddCircleOutline } from 'react-icons/io5';
import { RiAddBoxLine } from 'react-icons/ri';

const rakkas = Rakkas({
  variable: '--font-rakkas',
  subsets: ['latin'],
  weight: '400'
});

// const raleway = Raleway({
//   variable: '--font-raleway',
//   subsets: ['latin']
// });

export default function CourseSetup() {
  return (
    <>
      <h2
        className={`text-black text-3xl md:text-5xl p-8 font-bold border-b border-black capitalize ${rakkas.variable}`}
      >
        Course Details
      </h2>
      <Breadcrumb />

      <div className="container flex flex-col mt-8">
        <div className="cursor-pointer">
          <h3 className={`text-black text-2xl   md:text-4xl py-1 font-bold md:font-bold capitalize ${rakkas.variable}`}>
            Introduction to Computer Systems
          </h3>
          <h1 className={`text-[#176BAD] text-sm  md:text-xl pb-6 font-extralight capitalize  ${rakkas.variable}`}>
            Introduction to computer system Course Edit
          </h1>
        </div>
        <div className="basis-2/3">
          <div className="mt-8 grid grid-cols-1 gap-x-0 gap-y-4 md:grid-cols-3 md:gap-4 md:gap-y-[8.75rem] p-4 text-black">
            {/* Customize Your Lecture*/}
            <div className="col-span-3 order-3  w-full ">
              <div className={`flex pb-6 gap-x-1 font-bold items-center text-sm md:text-xl ${rakkas.variable}`}>
                <RiAddBoxLine className="cursor-pointer" />
                <h1>Customize Your Lecture</h1>
              </div>

              <div className="flex flex-col gap-y-8">
                <div className="bg-[#88AB73] p-5 pb-[3.75rem] rounded-[15px]">
                  <div className="flex justify-between mx-5  border-black border-b-[1px] ">
                    <h1 className={`font-[600] pb-2 text-sm md:text-xl ${rakkas.variable}`}>
                      Module: <span className="font-medium">Introduction to C</span>
                    </h1>
                    <div
                      className={`flex items-center text-sm md:text-[16px] cursor-pointer font-[600] gap-x-1 ${rakkas.variable}`}
                    >
                      <IoAddCircleOutline />
                      <h1>Add Lecture</h1>
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-5 pt-12">
                    <div
                      className={`flex justify-between items-center bg-amber-100 rounded-[10px] p-4 mx-5 ${rakkas.variable}`}
                    >
                      <div className="flex flex-col gap-y-2 md:flex-row md:items-center md:gap-2  font-semibold text-[15px] md:text-xl">
                        <div className="flex items-center gap-2">
                          <GrDatabase />
                          <h1 className="">Lecture - 1 </h1>
                        </div>
                        <span className="px-3.5 py-2.5 text-white font-semibold leading-1 text-[12px] rounded-[10px] bg-green-600 hover:bg-green-700">
                          Published
                        </span>
                      </div>
                      <div className="flex flex-col-reverse gap-y-2 md:flex-row md:items-center md:gap-2  font-semibold text-[15px] md:text-xl">
                        <span className="px-3.5 py-2.5 text-white font-semibold leading-1 text-[12px] rounded-[10px] bg-red-600 hover:bg-red-700">
                          Unpublished
                        </span>
                        <div className="flex items-center gap-2 cursor-pointer">
                          <FaRegEdit />
                          <h1>Edit</h1>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`flex justify-between items-center bg-amber-100 rounded-[10px] p-4 mx-5 ${rakkas.variable}`}
                    >
                      <div className="flex flex-col gap-y-2 md:flex-row md:items-center md:gap-2  font-semibold text-[15px] md:text-xl">
                        <div className="flex items-center gap-2">
                          <GrDatabase />
                          <h1 className="">Lecture - 1 </h1>
                        </div>
                        <span className="px-3.5 py-2.5 text-white font-semibold leading-1 text-[12px] rounded-[10px] bg-green-600 hover:bg-green-700">
                          Published
                        </span>
                      </div>
                      <div className="flex flex-col-reverse gap-y-2 md:flex-row md:items-center md:gap-2  font-semibold text-[15px] md:text-xl">
                        <span className="px-3.5 py-2.5 text-white font-semibold leading-1 text-[12px] rounded-[10px] bg-red-600 hover:bg-red-700">
                          Unpublished
                        </span>
                        <div className="flex items-center gap-2 cursor-pointer">
                          <FaRegEdit />
                          <h1>Edit</h1>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`flex justify-between items-center bg-amber-100 rounded-[10px] p-4 mx-5 ${rakkas.variable}`}
                    >
                      <div className="flex flex-col gap-y-2 md:flex-row md:items-center md:gap-2  font-semibold text-[15px] md:text-xl">
                        <div className="flex items-center gap-2">
                          <GrDatabase />
                          <h1 className="">Lecture - 1 </h1>
                        </div>
                        <span className="px-3.5 py-2.5 text-white font-semibold leading-1 text-[12px] rounded-[10px] bg-green-600 hover:bg-green-700">
                          Published
                        </span>
                      </div>
                      <div className="flex flex-col-reverse gap-y-2 md:flex-row md:items-center md:gap-2  font-semibold text-[15px] md:text-xl">
                        <span className="px-3.5 py-2.5 text-white font-semibold leading-1 text-[12px] rounded-[10px] bg-red-600 hover:bg-red-700">
                          Unpublished
                        </span>
                        <div className="flex items-center gap-2 cursor-pointer">
                          <FaRegEdit />
                          <h1>Edit</h1>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`flex justify-between items-center bg-amber-100 rounded-[10px] p-4 mx-5 ${rakkas.variable}`}
                    >
                      <div className="flex flex-col gap-y-2 md:flex-row md:items-center md:gap-2  font-semibold text-[15px] md:text-xl">
                        <div className="flex items-center gap-2">
                          <GrDatabase />
                          <h1 className="">Lecture - 1 </h1>
                        </div>
                        <span className="px-3.5 py-2.5 text-white font-semibold leading-1 text-[12px] rounded-[10px] bg-green-600 hover:bg-green-700">
                          Published
                        </span>
                      </div>
                      <div className="flex flex-col-reverse gap-y-2 md:flex-row md:items-center md:gap-2  font-semibold text-[15px] md:text-xl">
                        <span className="px-3.5 py-2.5 text-white font-semibold leading-1 text-[12px] rounded-[10px] bg-red-600 hover:bg-red-700">
                          Unpublished
                        </span>
                        <div className="flex items-center gap-2 cursor-pointer">
                          <FaRegEdit />
                          <h1>Edit</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* module2 */}
                <div className="bg-[#88AB73] p-5 pb-[3.75rem] rounded-[15px]">
                  <div className="flex justify-between mx-5  border-black border-b-[1px] ">
                    <h1 className={`font-[600] pb-2 text-sm md:text-xl ${rakkas.variable}`}>
                      Module: <span className="font-medium">Introduction to Java</span>
                    </h1>
                    <div
                      className={`flex items-center text-sm md:text-[16px] cursor-pointer font-[600] gap-x-1 ${rakkas.variable}`}
                    >
                      <IoAddCircleOutline />
                      <h1>Add Lecture</h1>
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-5 pt-12">
                    <div
                      className={`flex justify-between items-center bg-amber-100 rounded-[10px] p-4 mx-5 ${rakkas.variable}`}
                    >
                      <div className="flex flex-col gap-y-2 md:flex-row md:items-center md:gap-2  font-semibold text-[15px] md:text-xl">
                        <div className="flex items-center gap-2">
                          <GrDatabase />
                          <h1 className="">Lecture - 1 </h1>
                        </div>
                        <span className="px-3.5 py-2.5 text-white font-semibold leading-1 text-[12px] rounded-[10px] bg-green-600 hover:bg-green-700">
                          Published
                        </span>
                      </div>
                      <div className="flex flex-col-reverse gap-y-2 md:flex-row md:items-center md:gap-2  font-semibold text-[15px] md:text-xl">
                        <span className="px-3.5 py-2.5 text-white font-semibold leading-1 text-[12px] rounded-[10px] bg-red-600 hover:bg-red-700">
                          Unpublished
                        </span>
                        <div className="flex items-center gap-2 cursor-pointer">
                          <FaRegEdit />
                          <h1>Edit</h1>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`flex justify-between items-center bg-amber-100 rounded-[10px] p-4 mx-5 ${rakkas.variable}`}
                    >
                      <div className="flex flex-col gap-y-2 md:flex-row md:items-center md:gap-2  font-semibold text-[15px] md:text-xl">
                        <div className="flex items-center gap-2">
                          <GrDatabase />
                          <h1 className="">Lecture - 1 </h1>
                        </div>
                        <span className="px-3.5 py-2.5 text-white font-semibold leading-1 text-[12px] rounded-[10px] bg-green-600 hover:bg-green-700">
                          Published
                        </span>
                      </div>
                      <div className="flex flex-col-reverse gap-y-2 md:flex-row md:items-center md:gap-2  font-semibold text-[15px] md:text-xl">
                        <span className="px-3.5 py-2.5 text-white font-semibold leading-1 text-[12px] rounded-[10px] bg-red-600 hover:bg-red-700">
                          Unpublished
                        </span>
                        <div className="flex items-center gap-2 cursor-pointer">
                          <FaRegEdit />
                          <h1>Edit</h1>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`flex justify-between items-center bg-amber-100 rounded-[10px] p-4 mx-5 ${rakkas.variable}`}
                    >
                      <div className="flex flex-col gap-y-2 md:flex-row md:items-center md:gap-2  font-semibold text-[15px] md:text-xl">
                        <div className="flex items-center gap-2">
                          <GrDatabase />
                          <h1 className="">Lecture - 1 </h1>
                        </div>
                        <span className="px-3.5 py-2.5 text-white font-semibold leading-1 text-[12px] rounded-[10px] bg-green-600 hover:bg-green-700">
                          Published
                        </span>
                      </div>
                      <div className="flex flex-col-reverse gap-y-2 md:flex-row md:items-center md:gap-2  font-semibold text-[15px] md:text-xl">
                        <span className="px-3.5 py-2.5 text-white font-semibold leading-1 text-[12px] rounded-[10px] bg-red-600 hover:bg-red-700">
                          Unpublished
                        </span>
                        <div className="flex items-center gap-2 cursor-pointer">
                          <FaRegEdit />
                          <h1>Edit</h1>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`flex justify-between items-center bg-amber-100 rounded-[10px] p-4 mx-5 ${rakkas.variable}`}
                    >
                      <div className="flex flex-col gap-y-2 md:flex-row md:items-center md:gap-2  font-semibold text-[15px] md:text-xl">
                        <div className="flex items-center gap-2">
                          <GrDatabase />
                          <h1 className="">Lecture - 1 </h1>
                        </div>
                        <span className="px-3.5 py-2.5 text-white font-semibold leading-1 text-[12px] rounded-[10px] bg-green-600 hover:bg-green-700">
                          Published
                        </span>
                      </div>
                      <div className="flex flex-col-reverse gap-y-2 md:flex-row md:items-center md:gap-2  font-semibold text-[15px] md:text-xl">
                        <span className="px-3.5 py-2.5 text-white font-semibold leading-1 text-[12px] rounded-[10px] bg-red-600 hover:bg-red-700">
                          Unpublished
                        </span>
                        <div className="flex items-center gap-2 cursor-pointer">
                          <FaRegEdit />
                          <h1>Edit</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* space */}
              <div className="h-[8.75rem] mt-8 w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
