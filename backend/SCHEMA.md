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

Portfolio
  - id
  - user_id
  - total_ars
  - total_usd
  - date
  - assets []
