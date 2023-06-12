import {
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import React from "react";
import ChevronDown from "./Icons/ChevronDown";

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  leftIcon: React.ReactElement;
  title: string;
  onClickHandler: (filter: string) => void;
};

const DropDownMenu: React.FC<Props> = ({ options, leftIcon, title, onClickHandler }) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDown />}
        leftIcon={leftIcon}
        _hover={{ background: "none" }}
        _expanded={{ background: "none" }}
      >
        {title}
      </MenuButton>

      <MenuList>
        <MenuOptionGroup defaultValue="asc" type="radio">
          {options.map((elem) => (
            <MenuItemOption
              key={elem.value}
              value={elem.value}
              onClick={() => onClickHandler(elem.value)}
            >
              {elem.label}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default DropDownMenu;
