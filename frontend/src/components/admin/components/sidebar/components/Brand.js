import React from "react";

// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components

import { HSeparator } from "../../separator/Separator";
import { AiOutlineHome } from "react-icons/ai";



export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");
  const homehadnler = () => {

  }

  return (
    <Flex align='center' direction='column'>
      <a href="http://3.36.1.132:3000/" ><AiOutlineHome size="100"></AiOutlineHome></a>
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
