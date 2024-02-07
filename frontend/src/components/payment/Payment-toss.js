import React, { useEffect, useRef, useState } from "react";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createBrowserHistory } from 'history'
import Button from 'react-bootstrap/Button'

const widgetClientKey = process.env.REACT_APP_WIDGET_CLIENT_KEY
const customerKey = "RTD_YhbsTBDpIQ4cYKASB";

export default function PaymentToss({product,user,spending,mileage,callback,handleClose}) {
  const [paymentWidget, setPaymentWidget] = useState(null);
  const paymentMethodsWidgetRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const Authorization = 'Bearer '+window.sessionStorage.getItem('accessToken')
  const refreshtoken = window.sessionStorage.getItem('refreshToken')
  const history = createBrowserHistory()

  useEffect(() => {
    const fetchPaymentWidget = async () => {
      try {
        const loadedWidget = await loadPaymentWidget(widgetClientKey, customerKey);
        setPaymentWidget(loadedWidget);
      } catch (error) {
        console.error("Error fetching payment widget:", error);
      }
    };

    fetchPaymentWidget();
  }, []);

  useEffect(() => {
    if (paymentWidget == null) {
      return;
    }

    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      "#payment-widget",
      { value: spending },
      { variantKey: "DEFAULT" }
    );

    paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });

    paymentMethodsWidgetRef.current = paymentMethodsWidget;
    window.onload = function () {
      // 현재 페이지 URL을 확인하여 리다이렉션인 경우 무시
      if (window.location.href.includes("m_redirect_url")) {
        history.pushState({}, document.title, window.location.pathname);
      }
    };
  }, [paymentWidget]);

  const handlePaymentRequest = async () => {
      await paymentWidget.requestPayment({
        orderId: nanoid(),
        orderName: product.name,
        customerName: user.name,
        customerEmail: user.email,
        //customerMobilePhone: user.phone,
        successUrl: `${window.location.origin}/payment/success?user_id=${user.id}&product_id=${product.id}&mileage=${mileage}`,
        failUrl: `${window.location.origin}/payment`,
        _skipAuth: "FORCE_SUCCESS",
      }).catch(e => console.error("Error requesting payment:", e))
  };

  return (
    <div>
      <div id="payment-widget" />
      <div id="agreement" />
      <Button style={{margin: '10px'}} onClick={handlePaymentRequest}>결제하기</Button>
	  <Button style={{margin: '10px'}} onClick={handleClose}>닫기</Button>
    </div>
  );
}