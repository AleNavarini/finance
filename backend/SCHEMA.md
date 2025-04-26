# Schema
User
  - id
  - name
  - email
  - created_at
  - updated_at
  - assets []

Asset
  - type (stock, bond)
  - ticker
  - price
  - currency (ars,usd)

Portfolio
  - user_id
  - total_ars
  - total_usd
  - date
