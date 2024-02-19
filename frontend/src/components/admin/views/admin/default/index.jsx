import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';

import MiniCalendar from '../../../components/calendar/MiniCalendar';
import MiniStatistics from '../../../components/card/MiniStatistics';
import IconBox from '../../../components/icons/IconBox';
import React, { useState, useEffect } from 'react';
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import { BsFillChatLeftFill } from 'react-icons/bs';
import { BiPackage } from 'react-icons/bi';
import CheckTable from './components/CheckTable';
import ComplexTable from './components/ComplexTable';
import DailyTraffic from './components/DailyTraffic';
import PieCard from './components/PieCard';
import Tasks from './components/Tasks';
import TotalSpent from './components/TotalSpent';
import WeeklyRevenue from './components/WeeklyRevenue';
import { columnsDataCheck, columnsDataComplex } from './variables/columnsData';
import tableDataCheck from './variables/tableDataCheck.json';
import tableDataComplex from './variables/tableDataComplex.json';

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

  const [productCount, setProductcount] = useState();
  const [userCount, setusercount] = useState();
  useEffect(() => {
    fetch('iamchatpiamchatpt.com:4430ount', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('accessToken'),
        refreshtoken: sessionStorage.getItem('refreshToken'),
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        setProductcount(resData.productCount);
        setusercount(resData.userCount);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, '2xl': 6 }}
        gap="20px"
        mb="20px"
      >
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />
              }
            />
          }
          name="Number of orders"
          value="$350.4"
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={<BsFillChatLeftFill size="40" />}
            />
          }
          name="Inquiry"
          value="3"
        />
        <MiniStatistics growth="+23%" name="Sales" value="$574.34" />
        <MiniStatistics
          endContent={
            <Flex me="-16px" mt="10px">
              <FormLabel htmlFor="balance">
                <AiOutlineUser size="50"></AiOutlineUser>
              </FormLabel>
            </Flex>
          }
          name="Total User"
          value={userCount}
        />
        <MiniStatistics
          endContent={
            <Flex me="-16px" mt="10px">
              <FormLabel htmlFor="balance">
                <BiPackage size="50"></BiPackage>
              </FormLabel>
            </Flex>
          }
          name="Total Product"
          value={productCount}
        />
        <MiniStatistics
          endContent={
            <Flex me="-16px" mt="10px">
              <FormLabel htmlFor="balance"></FormLabel>
            </Flex>
          }
          name="SALE Product"
          value={productCount}
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <TotalSpent />
        <WeeklyRevenue />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          <DailyTraffic />
          <PieCard />
        </SimpleGrid>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          <Tasks />
          <MiniCalendar h="100%" minW="100%" selectRange={false} />
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}
