import HeaderSection from "@/components/HeaderSection";
import { Metadata } from "next";
import Image from "next/image";
import { IoEyeOutline, IoLocateOutline } from "react-icons/io5";

export const metadata: Metadata = {
  title: "About",
  description: "Who We Are",
};

const AboutPage = () => {
  return (
    <div>
      <HeaderSection title="About" subtitle="Lorem ipsum dolor sit amet." />
      <div className="max-w-7xl ma-auto py-20 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <Image src="/hero.png" alt="about" width={650} height={579} />
          <div className="">
            <h1 className="text-5xl font-semibold text-gray-900 mb-4">
              Who We Are
            </h1>
            <p className="text-gray-700 py-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              omnis voluptatum libero optio perferendis quia. Illo autem sed
              blanditiis consectetur.
            </p>
            <ul className="list-item space-y-6 pt-8">
              <li className="flex gap-5">
                <div className="flex-none mt-1">
                  <IoEyeOutline className="size-7" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">Vision :</h4>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla cum asperiores saepe, quo perferendis quibusdam.
                  </p>
                </div>
              </li>
              <li className="flex gap-5">
                <div className="flex-none mt-1">
                  <IoLocateOutline className="size-7" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">Mission :</h4>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Fugiat mollitia exercitationem et cumque reprehenderit
                    soluta esse natus consectetur rem provident?
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
