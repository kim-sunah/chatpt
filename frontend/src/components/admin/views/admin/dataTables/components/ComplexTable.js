import {
  Flex,
  Table,
  Progress,
  Icon,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useMemo, useEffect, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Custom components
import Card from "../../../../components/card/Card";

import { PaginationControl } from 'react-bootstrap-pagination-control';
import openSocket from 'socket.io-client';

// Assets
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
export default function ColumnsTable(props) {
  const [pages, setPage] = useState(1)
  const [productList, setproductList] = useState()
  const [productCount, setProductCount] = useState()


  useEffect(() => {
    fetch("https://iamchatpt.com:444/admin/productlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pages: pages }) }).then(res => res.json()).then(resData => { console.log(resData); setProductCount(resData.productCount); setproductList(resData.products) }).catch(err => console.log(err))
    const socket = openSocket('https://iamchatpt.com:444', { transports: ['websocket'] });
    socket.on('events', (data) => {
      if (data === "acceptproduct") {
        fetch("https://iamchatpt.com:444/admin/productlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pages: pages }) }).then(res => res.json()).then(resData => { console.log(resData); setProductCount(resData.productCount); setproductList(resData.products) }).catch(err => console.log(err))
      }
    });
  }, [pages])
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
  initialState.pageSize = 5;

  const textColor = useColorModeValue("secondaryGray.900", "white");
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
          Product List
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
        <Tbody >
          {productList && productList.map((product, index) => {
            return (
              <Tr key={index}>
                <Td fontSize={{ sm: "14px" }} minW={{ sm: "150px", md: "200px", lg: "auto" }} borderColor='transparent'>
                  <Flex align='center'>
                    <Text color={textColor} fontSize='sm' fontWeight='700' style={{ whiteSpace: "nowrap" }}>
                      <img src={product.thumbnail} style={{ width: "100px", height: "80px" }}></img>
                    </Text>
                  </Flex>
                </Td>
                <Td fontSize={{ sm: "14px" }} minW={{ sm: "150px", md: "200px", lg: "auto" }} borderColor='transparent'>
                  <Flex align='center'>
                    <Text color={textColor} fontSize='sm' fontWeight='700' style={{ whiteSpace: "nowrap" }}>
                      {product.name}
                    </Text>
                  </Flex>
                </Td>
                <Td fontSize={{ sm: "14px" }} minW={{ sm: "150px", md: "200px", lg: "auto" }} borderColor='transparent'>
                  <Flex align='center'>
                    <Text color={textColor} fontSize='sm' fontWeight='700' style={{ whiteSpace: "nowrap" }}>
                      {product.sale_price}
                    </Text>
                  </Flex>
                </Td>
                <Td fontSize={{ sm: "14px" }} minW={{ sm: "150px", md: "200px", lg: "auto" }} borderColor='transparent'>
                  <Flex align='center'>
                    <Text color={textColor} fontSize='sm' fontWeight='700' style={{ whiteSpace: "nowrap" }}>
                      {product.price}
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
        total={productCount}
        limit={5}
        changePage={(pages) => {
          setPage(pages)
        }}
        ellipsis={1}
      />
    </Card>
  );
}
