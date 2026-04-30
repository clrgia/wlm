import { NextPage } from "next";
import Dropdown, { DropdownItem } from "@/components/ui/dropdown";
import { useState, useRef, useEffect } from "react";

interface Props {}

const AddContact: NextPage<Props> = ({}) => {
  const [selectedValue, setSelectedValue] = useState("");

  const dropdownItems: DropdownItem[] = [
    {
      label: "Add Contact...",
      onClick: () => {
        // Handle add contact logic
      },
      dividerBefore: false,
      disabled: false,
    },
    {
      label: "Create a group...",
      onClick: () => {
        // Handle create group logic
      },
      dividerBefore: false,
      disabled: false,
    },
        {
      label: "Create a category...",
      onClick: () => {
        // Handle create category logic
      },
      dividerBefore: false,
      disabled: false,
    },
        {
      label: "Search for people...",
      onClick: () => {
        // Handle search for people logic
      },
      dividerBefore: true,
      disabled: false,
    },
  ];

  return (
    <div className="flex">
      <Dropdown
        trigger={
          <div className="flex gap-1 items-center aerobutton p-1 ml-1 h-6">
            <div className="w-5">
              <img src={`/contacts/add_contact.png`} alt="" />
            </div>
            <div>
              <img src={`/general/arrow.png`} alt="" />
            </div>
          </div>
        }
        items={dropdownItems}
        align="right"
      />
      <div className="flex gap-1 items-center aerobutton pl-1 h-6">
        <div className="w-5">
          <img src={`/contacts/change_contact_list_layout.png`} alt="" />
        </div>
      </div>
      <div className="flex gap-1 items-center aerobutton p-1 h-6">
        <div className="w-5">
          <img src={`/contacts/1489.png`} alt="" />
        </div>
        <div>
          <img src={`/general/arrow.png`} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AddContact;
