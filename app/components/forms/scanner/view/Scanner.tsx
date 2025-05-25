import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScannerSelect } from "../hooks/useScannerSelect";
import { ScannerList } from "../modal/ScannerListData";

const Scanner = () => {
  const {
    open,
    setOpen,
    selected: selectedOrganization,
    searchValue,
    setSearchValue,
    filteredScanners,
    handleSelect,
  } = useScannerSelect(ScannerList);

  return (
    <div className="space-y-4 w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <button
              className="w-full flex items-center justify-between p-2 pl-10 border rounded-md text-sm hover:bg-gray-50"
              aria-expanded={open}
            >
              {selectedOrganization ? (
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={selectedOrganization.profile_picture} />
                    <AvatarFallback>
                      {selectedOrganization.organization_name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{selectedOrganization.organization_name}</span>
                </div>
              ) : (
                <span className="text-muted-foreground">
                  Select an organization
                </span>
              )}
            </button>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
        >
          <Command shouldFilter={false}>
            <CommandInput
              value={searchValue}
              onValueChange={setSearchValue}
              className="pl-10"
            />
            <CommandList>
              <CommandEmpty>No organizations found.</CommandEmpty>
              <CommandGroup className="p-1">
                {filteredScanners.map((scanner) => (
                  <CommandItem
                    key={scanner.id}
                    value={scanner.id.toString()}
                    onSelect={() => handleSelect(scanner)}
                    className="p-0 m-0 w-full data-[selected=true]:bg-transparent"
                  >
                    <div className="px-4 py-2 w-full">
                      <div className="flex items-center gap-3 w-full p-2 hover:bg-gray-50 rounded">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={scanner.profile_picture} />
                          <AvatarFallback>
                            {scanner.organization_name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="text-sm font-medium">
                            {scanner.organization_name}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {scanner.address}
                          </p>
                        </div>
                        <Check
                          className={cn(
                            "h-4 w-4",
                            selectedOrganization?.id === scanner.id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedOrganization && (
        <div className="p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={selectedOrganization.profile_picture} />
              <AvatarFallback>
                {selectedOrganization.organization_name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">
                {selectedOrganization.organization_name}
              </p>
              <p className="text-sm text-gray-600">
                {selectedOrganization.address}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scanner;
