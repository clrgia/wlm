import { NextPage } from "next";
import Dropdown, { DropdownItem } from "@/components/ui/dropdown";
import { useState, useRef, useEffect } from "react";
import AddContactModal from "./add-contact-modal";

interface Props {}

const AddContact: NextPage<Props> = ({}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [showAddContactModal, setShowAddContactModal] = useState(false);

  const dropdownItems: DropdownItem[] = [
    {
      label: "Add Contact...",
      onClick: () => {
        setShowAddContactModal(true);
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
    <div className="flex items-center h-full">
      <Dropdown
        trigger={
          <div className="flex gap-1 items-center aerobutton p-1 cursor-pointer">
            <div className="w-7">
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
      <div className="flex gap-1 items-center aerobutton p-1 cursor-pointer">
        <div className="w-7">
          <img src={`/contacts/change_contact_list_layout.png`} alt="" />
        </div>
      </div>
      <div className="flex gap-1 items-center aerobutton p-1 cursor-pointer">
        <div className="w-7">
          <img src={`/contacts/1489.png`} alt="" />
        </div>
        <div>
          <img src={`/general/arrow.png`} alt="" />
        </div>
      </div>
      {showAddContactModal && (
        <AddContactModal setShowAddContactModal={setShowAddContactModal} />
      )}
    </div>
  );
};

export default AddContact;
