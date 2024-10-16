# sierra-interview

# To run app:

1. Cd into "app/sierra"
2. Run "npm install"
3. Run "npm start"

# To run server:

1. Cd into "server"
2. Run "npm install"
3. Run "nodemon server"

# Test cases:

Order tracking:

1. Success: "Can you look up my order status? My email is george.hill@example.com and my order number is #W009." -> Delivered

2. More information: "Can you look up my order status? My email is george.hill@example.com." -> Prompt for Order Number

3. No record: "Can you look up my order status? My email is dvxwang@gmail.com and my order number is #W009." -> No order found

Early Riser’s Promotion:

1. Success: "Can you give me an “Early Risers Promotion”?" (Time valid) -> Coupon generated

2. Failure: Can you give me a promotion? (No promotion name) -> No coupon available

3. Failure: Can you give me an “Early Risers Promotion”? (Time invalid) -> No coupon available

Product Availability:

1. Success: "Can you tell me if you have any red shoes in stock?" -> 50 units
2. More information: "Can you tell me if you have something in stock?" -> Ask for product
3. Failure: "Can you tell me if you have David’s Fragile Walking Stick in stock?" -> No product found

Cannot handle request:

1. Ask "How do I make salmon?" -> Ask for rephrase

Human intervention:

1. Ask "How do I make salmon?" 3x -> Redirect to human


