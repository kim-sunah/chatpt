/* eslint-disable */
import {
  Flex,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "../../../../components/card/Card";

import React, { useMemo, useState , useEffect } from "react";
import { PaginationControl } from 'react-bootstrap-pagination-control';
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import openSocket from 'socket.io-client';

export default function DevelopmentTable(props) {
  const [userList , setuserList] = useState("");
  const [usercount , setusercount] = useState()
  const [pages, setPage] = useState(1)

  useEffect(() => {
    fetch("http://localhost:4000/admin/userlist", { method: "POST", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("accessToken"), "refreshtoken": sessionStorage.getItem("refreshToken") }, body: JSON.stringify({ pages: pages }) }).then(res => res.json()).then(resData => { setusercount(resData.userCount); setuserList(resData.users)}).catch(err => console.log(err))
    const socket = openSocket('http://localhost:4000', { transports: ['websocket'] });
    socket.on('events', (data) => {
          if(data === "userban"){
            fetch("http://localhost:4000/admin/userlist", { method: "POST", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("accessToken"), "refreshtoken": sessionStorage.getItem("refreshToken") }, body: JSON.stringify({ pages: pages }) }).then(res => res.json()).then(resData => { setusercount(resData.userCount); setuserList(resData.users)}).catch(err => console.log(err))
          }
    });
  }, [pages])


  const banuser = (id) => {
    fetch(`http://localhost:4000/admin/limituser/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }}).then(res => res.json()).then(resData => console.log(resData)).catch(err => console.log(err))
 
  }
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("secondaryGray.500", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <Card
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px='25px' justify='space-between' mb='20px' align='center'>
        <Text
          color={textColor}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'>
          User Table
        </Text>
      
      </Flex>
      <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe='10px'
                  key={index}
                  borderColor={borderColor}>
                  <Flex
                    justify='space-between'
                    align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {userList && userList.map((user, index) => {
            return (
              <Tr key={index}>
              <Td fontSize={{ sm: "14px" }} minW={{ sm: "150px", md: "200px", lg: "auto" }} borderColor='transparent'>
                <Flex align='center'>
                  <Text color={textColor} fontSize='sm' fontWeight='700' style={{ whiteSpace: "nowrap" }}>
                  {user.nickname}
                  </Text>
                </Flex>
              </Td>
              <Td fontSize={{ sm: "14px" }} minW={{ sm: "150px", md: "200px", lg: "auto" }} borderColor='transparent'>
                <Flex align='center'>
                  <Text color={textColor} fontSize='sm' fontWeight='700' style={{ whiteSpace: "nowrap" }}>
                  {user.gender}
                  </Text>
                </Flex>
              </Td>
              <Td fontSize={{ sm: "14px" }} minW={{ sm: "150px", md: "200px", lg: "auto" }} borderColor='transparent'>
                <Flex align='center'>
                  <Text color={textColor} fontSize='sm' fontWeight='700' style={{ whiteSpace: "nowrap" }}>
                  {user.authority}
                  </Text>
                </Flex>
              </Td>
              <Td fontSize={{ sm: "14px" }} minW={{ sm: "150px", md: "200px", lg: "auto" }} borderColor='transparent'>
                <Flex align='center'>
                  <Text color={textColor} fontSize='sm' fontWeight='700' style={{ whiteSpace: "nowrap" }}>
                  {user.registration_information}
                  </Text>
                </Flex>
              </Td>
              <Td fontSize={{ sm: "14px" }} minW={{ sm: "150px", md: "200px", lg: "auto" }} borderColor='transparent' onClick={() => banuser(user.id)}>
                <Flex align='center'>
                  <Text color={textColor} fontSize='sm' fontWeight='700' style={{ whiteSpace: "nowrap" ,color : "red", cursor:"pointer"}}>
                  ban
                  </Text>
                </Flex>
              </Td>
            </Tr>
            );
          })}
        </Tbody>
      </Table>
      <PaginationControl
                page={pages}
                between={4}
                total={usercount}
                limit={11}
                changePage={(pages) => {
                    setPage(pages)
                }}
                ellipsis={1}/>
    </Card>
  );
}
