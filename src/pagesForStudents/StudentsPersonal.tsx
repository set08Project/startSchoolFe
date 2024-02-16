import { FC, useState } from "react";
import Input from "../components/reUse/Input";

interface iPersonal {
  change: boolean;
}

const StudentsPersonal: FC<iPersonal> = ({ change }) => {
  const [address, setAddress] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  return (
    <div className="overflow-hidden">
      <div className="ml-[40px] mt-4 grid w-[100%] grid-cols-1 md:grid-cols-2 md:w-[60%] overflow-hidden">
        <Input
          placeholder="First name"
          className="md:w-[87%] w-[80%]   text-black"
          type="name"
          required
          value={firstName}
          onChange={(e: any) => {
            setFirstName(e.target.value);
          }}
        />

        <Input
          placeholder="Last name"
          className="md:w-[95%] w-[80%]  text-black"
          type="name"
          required
          value={lastName}
          onChange={(e: any) => {
            setLastName(e.target.value);
          }}
        />
        <Input
          placeholder="Phone number"
          className="w-[80%] md:w-[87%]  text-black"
          type="name"
          required
          value={number}
          onChange={(e: any) => {
            setNumber(e.target.value);
          }}
        />
        <Input
          placeholder="My address"
          className="md:w-[95%] w-[80%] md:ml-5 text-black"
          type="address"
          required
          value={address}
          onChange={(e: any) => {
            setAddress(e.target.value);
          }}
        />
      </div>
      <textarea
        placeholder="Bio"
        className="md:w-[40%] h-[156px] w-[80%] ml-12  md:ml-12 text-black border-gray-300 p-3 rounded-md border resize-none outline-blue-500"
        required
        value={bio}
        onChange={(e: any) => {
          setBio(e.target.value);
        }}
      />
    </div>
  );
};

export default StudentsPersonal