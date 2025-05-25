import { useSingleSlotBooking } from "@/store/single_slot_booking_store/hooks/useSingleSlotBooking";
import { useState } from "react";

export const useScannerSelect = (
  scanners: {
    organization_name: string;
    address: string;
    profile_picture: string;
    id: number;
  }[]
) => {
  const { setSingleSlotBooking, singleSlotBooking } = useSingleSlotBooking();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<
    | {
        organization_name: string;
        address: string;
        profile_picture: string;
        id: number;
      }
    | undefined
  >(singleSlotBooking.form2.value);
  const [searchValue, setSearchValue] = useState("");

  const filteredScanners = scanners.filter((scanner) =>
    scanner.organization_name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSelect = (scanner: {
    organization_name: string;
    address: string;
    profile_picture: string;
    id: number;
  }) => {
    setSelected(scanner);
    setSingleSlotBooking(
      (prev) => (prev = { ...prev, form2: { value: scanner } })
    );
    setOpen(false);
    setSearchValue("");
  };

  return {
    open,
    setOpen,
    selected,
    searchValue,
    setSearchValue,
    filteredScanners,
    handleSelect,
  };
};
