# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## usersテーブル

|Column|Type|Option|
|------|----|------|
|id|integer|
|e-mail|string|null:false|
|passward|string|null:false|
|name|string|null:false|

### Association
- has_many : groups through : groups_users
- has_many : messages
- has_many : groups_users


## message テーブル

|Column|Type|Option|
|------|----|------|
|id|integer|------|
|users_id|integer|null:false.foreign_key: true|
|groups_id|integer|null: false, foreign_key:true|
|body|text| 
|image|string|

### Association
- belongs_to :group
- belongs_to :user



## groups テーブル

|Column|Type|Option|
|------|----|------|
|id|integer|-----|
|name|string|null:false|

### Association
- has_many : users through : groups_users
- has_many : messages
- has_many : groups_users



## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user