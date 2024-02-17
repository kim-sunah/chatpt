import {
  Flex,
  Table,
  Checkbox,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useMemo, useEffect, useState } from "react";

import "./style.css"
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { PaginationControl } from 'react-bootstrap-pagination-control';
import 'bootstrap/dist/css/bootstrap.min.css';

// Custom components
import Card from "../../../../components/card/Card"

export default function CheckTable(props) {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const [pages, setPage] = useState(1)

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
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const [User, setUser] = useState("")
  const [userCount, setusercount] = useState();

  useEffect(() => {
    fetch("https://iamchatpt.com:4430/admin/Alluser", { method: "GET", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("accessToken"), "refreshtoken": sessionStorage.getItem("refreshToken") } }).then(res => res.json()).then(resData => { console.log(resData); setusercount(resData.userCount); setUser(resData.users) }).catch(err => console.log(err))

  }, [pages])
  return (
    <Card
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px='25px' justify='space-between' align='center'>
        <Text
          color={textColor}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'>
          Recent Subscribers
        </Text>

      </Flex>
      <Table {...getTableProps()} variant='simple' color='gray.500' mb='12px'>
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe="70px"
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
          {User && User.map((user, index) => {
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
              </Tr>
            );
          })}

        </Tbody>


      </Table>
      <div className="pagenation">
        <PaginationControl
          page={pages}
          between={4}
          total={userCount}
          limit={6}
          changePage={(pages) => {
            setPage(pages)
          }}
          ellipsis={1}
        />
      </div>
    </Card>
  );
}



