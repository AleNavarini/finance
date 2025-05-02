# Schema
User
  - id
  - name
  - email
  - created_at
  - updated_at
  - Portfolio

Asset
  - id
  - type (stock, bond)
  - ticker


Order:
  - id
  - type
  - asset
  - price


Portfolio
  - id
  - user_id
  - total_ars
  - total_usd
  - date
  - assets []

MoneyMovements:
  - id
  - portfolio_id
  - amount_ars
  - amount_usd
  - date
