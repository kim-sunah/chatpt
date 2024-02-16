const Diagram = ({ totalSales, paymentData }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            {paymentData.map((payment, index) => {
                const paymentPercentage = (payment.spending / totalSales) * 100;
                return (
                    <div
                        key={index}
                        style={{
                            backgroundColor: index % 2 === 0 ? '#3498db' : '#e74c3c',
                            height: `${paymentPercentage}%`,
                            flex: 1,
                            marginRight: index % 2 === 0 ? '5px' : '0px', // 홀수 번째 아이템은 간격 조정
                            marginLeft: index % 2 !== 0 ? '5px' : '0px', // 짝수 번째 아이템은 간격 조정
                        }}
                    ></div>
                );
            })}
        </div>
    );
};
