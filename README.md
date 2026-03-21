
# IT461
SELECT *
FROM Orders
WHERE
order_id = {{input_orderid.text || 0}}
OR customer_name ILIKE {{'%' + input_customer.text + '%'}}
OR phone ILIKE {{'%' + input_phone.text + '%'}}
ORDER BY dropoff_date DESC
