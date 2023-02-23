---
title: CMS(College Classrooms Management System) v1.0.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.11"

---

# CMS(College Classrooms Management System)

> v1.0.0

# Index

## GET 测试

GET /

> 返回示例

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 退出登陆

GET /logout

> 返回示例

> 成功

```json
{
  "status": 1001,
  "message": false,
  "detail": "请求未授权"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

# Classroom

## POST 添加教室信息

POST /classroom/add

> Body 请求参数

```json
{
  "area": 0,
  "number": "string",
  "type": 0,
  "capacity": 0,
  "authority": true,
  "available": true
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» area|body|integer| 是 |教室区域|
|» number|body|string| 是 |教室编号|
|» type|body|integer| 是 |教室类型|
|» capacity|body|integer| 否 |教室容纳人数|
|» authority|body|boolean| 否 |申请是否需要审核|
|» available|body|boolean| 否 |教室可用状态|

> 返回示例

> 成功

```json
{
  "status": 1,
  "message": true,
  "data": "教室信息添加成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 申请使用教室

GET /classroom/apply

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|classroomId|query|integer| 是 |教室ID|
|startTime|query|string| 是 |开始使用时间|
|endTime|query|string| 是 |结束使用时间|

> 返回示例

> 成功

```json
{
  "status": 1,
  "message": true,
  "data": "教室使用申请成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 提前退还教室

GET /classroom/refunds

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|classroomRecordId|query|integer| 是 |教室申请记录ID|

> 返回示例

> 成功

```json
{
  "status": 1,
  "message": true,
  "data": "教室退还成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 删除教室信息

GET /classroom/delete

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|classroomId|query|integer| 是 |教室ID|

> 返回示例

> 成功

```json
{
  "status": 1,
  "message": true,
  "data": "教室信息删除成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 查询教室列表

GET /classroom/queryList

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|string| 是 |分页|
|length|query|string| 是 |数据长度|
|area|query|string| 否 |区域|
|type|query|string| 否 |类型|
|number|query|string| 否 |教室编号|

> 返回示例

> 成功

```json
{
  "status": 1,
  "message": "查询教室数据列表成功",
  "data": {
    "first": true,
    "hasPrevious": false,
    "hasNext": true,
    "last": false,
    "num": 1,
    "pageSize": 10,
    "pageTotal": 10,
    "recordsTotal": 93,
    "items": [
      {
        "id": 1,
        "area": 1,
        "number": "A01",
        "type": 4,
        "capacity": 40,
        "authority": false,
        "available": true
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## POST 更新教室信息

POST /classroom/update

> Body 请求参数

```json
{
  "id": 0,
  "area": 0,
  "number": "string",
  "type": 0,
  "capacity": 0,
  "authority": true,
  "available": true
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» id|body|integer| 是 |教室ID|
|» area|body|integer| 是 |教室区域|
|» number|body|string| 是 |教室编号|
|» type|body|integer| 是 |教室类型|
|» capacity|body|integer| 否 |教室容纳人数|
|» authority|body|boolean| 否 |申请是否需要审核|
|» available|body|boolean| 否 |教室可用状态|

> 返回示例

> 成功

```json
{
  "status": 1,
  "message": true,
  "data": "教室数据更新成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

# ClassroomRecord

## GET 取消申请

GET /classroomRecord/cancelApply

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|classroomRecordId|query|string| 是 |申请表ID|

> 返回示例

> 成功

```json
{
  "status": 1,
  "message": true,
  "data": "取消申请成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 用户申请记录查询

GET /classroomRecord/userQuery

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|string| 是 |分页|
|length|query|string| 是 |数据长度|
|complete|query|string| 否 |是否已完成|

> 返回示例

> 成功

```json
{
  "status": 1,
  "message": true,
  "data": {
    "first": true,
    "hasPrevious": false,
    "hasNext": false,
    "last": true,
    "num": 1,
    "pageSize": 10,
    "pageTotal": 1,
    "recordsTotal": 1,
    "items": [
      {
        "id": 1,
        "uuid": "297ee8c7-6c79-451f-a526-0b3b403472dd",
        "classroom": "D08",
        "start": "2023-02-23 10:35:58",
        "end": "2023-02-23 10:55:58",
        "status": true,
        "pass": true,
        "finish": false,
        "date": "2023-02-23 10:35:58"
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 查询申请列表

GET /classroomRecord/queryList

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|string| 是 |分页|
|length|query|string| 是 |数据长度|
|complete|query|integer| 否 |是否已审核|

> 返回示例

> 成功

```json
{
  "status": 1,
  "message": true,
  "data": {
    "first": true,
    "hasPrevious": false,
    "hasNext": false,
    "last": true,
    "num": 1,
    "pageSize": 10,
    "pageTotal": 1,
    "recordsTotal": 1,
    "items": [
      {
        "id": 1,
        "uuid": "297ee8c7-6c79-451f-a526-0b3b403472dd",
        "user": "测试用户1",
        "classroom": "D08",
        "start": "2023-02-23 10:35:58",
        "end": "2023-02-23 10:55:58",
        "status": true,
        "pass": true,
        "finish": false,
        "date": "2023-02-23 10:35:58"
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## POST 教室申请审批

POST /classroomRecord/approval

> Body 请求参数

```json
{
  "classroomRecordId": 0,
  "agree": true
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» classroomRecordId|body|integer| 是 |申请ID|
|» agree|body|boolean| 是 |是否通过|

> 返回示例

> 成功

```json
{
  "status": 1,
  "message": true,
  "data": "审批通过成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

# User

## POST 更新资料

POST /user/update

> Body 请求参数

```json
{
  "number": "string",
  "email": "string",
  "name": "string",
  "stitute": 0,
  "authority": 0
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» number|body|string| 是 |用户编号|
|» email|body|string| 是 |邮箱|
|» name|body|string| 是 |真实姓名|
|» stitute|body|integer| 是 |学院|
|» authority|body|integer| 是 |身份|

> 返回示例

> 成功

```json
{
  "status": 1,
  "message": true,
  "data": "用户资料更新成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» status|integer|true|none||API接口状态码|
|» message|boolean|true|none||API接口信息|
|» data|string|true|none||返回数据|

## POST 用户注册

POST /user/register

> Body 请求参数

```yaml
number: "123123"
email: 123@123.com
name: name1
stitute: stitute1
authority: "0"
password: "123"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» number|body|string| 否 |学号|
|» email|body|string| 否 |邮箱|
|» name|body|string| 否 |姓名|
|» stitute|body|string| 否 |部门|
|» authority|body|string| 否 |权限|
|» password|body|string| 否 |密码|

> 返回示例

> 成功

```json
{
  "status": 1,
  "message": true,
  "data": "用户注册成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## POST 修改密码

POST /user/modifyPassword

> Body 请求参数

```yaml
oldPassword: "{{'123'|md5}}"
newPassword: "{{'234'|md5}}"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» oldPassword|body|string| 否 |旧密码|
|» newPassword|body|string| 否 |新密码|

> 返回示例

> 成功

```json
{
  "status": 1,
  "message": true,
  "data": "密码修改成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 用户登陆

GET /user/login

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|username|query|string| 是 |none|
|password|query|string| 是 |none|

> 返回示例

> 成功

```json
{
  "status": 1,
  "message": true,
  "data": {
    "type": "user",
    "name": "测试用户1"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 用户资料

GET /user/profile

> 返回示例

> 成功

```json
{
  "status": 1,
  "message": true,
  "data": {
    "number": "123",
    "email": "123@163.com",
    "name": "测试用户1",
    "stitute": 1,
    "authority": 0
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

# Admin

## GET 管理员资料

GET /admin/profile

> 返回示例

> 成功

```json
{
  "status": 1,
  "message": true,
  "data": {
    "username": "admin",
    "name": "管理员",
    "authority": 10
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## POST 添加管理员

POST /admin/register

> Body 请求参数

```yaml
username: admin
name: admin
password: admin

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» username|body|string| 否 |none|
|» name|body|string| 否 |none|
|» password|body|string| 否 |none|

> 返回示例

> 成功

```json
{
  "status": 1,
  "message": true,
  "data": "管理员注册成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 管理员登陆

GET /admin/login

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|username|query|string| 否 |用户名|
|password|query|string| 否 |密码|

> 返回示例

> 成功

```json
{
  "status": 1,
  "message": true,
  "data": {
    "type": "admin",
    "name": "管理员"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## POST 修改姓名

POST /admin/modifyName

> Body 请求参数

```yaml
name: admin

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» name|body|string| 否 |none|

> 返回示例

> 成功

```json
{
  "status": 1,
  "message": true,
  "data": "管理员姓名修改成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## POST 修改密码

POST /admin/modifyPassword

> Body 请求参数

```yaml
oldPassword: "123"
newPassword: "123"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» oldPassword|body|string| 否 |旧密码|
|» newPassword|body|string| 否 |新密码|

> 返回示例

> 成功

```json
{
  "status": 1,
  "message": true,
  "data": "管理员密码修改成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

# Dashboard

## GET 数据面板查询

GET /dashboard/query

> 返回示例

> 成功

```json
{
  "status": 1,
  "message": true,
  "data": {
    "time": "2023-02-23 10:02:00",
    "user": {
      "inActive": 2,
      "unActive": 0,
      "inUse": 0,
      "unUse": 2
    },
    "classroom": {
      "inUse": 0,
      "inApproval": 0,
      "unUse": 93
    },
    "record": {
      "date": [
        "2023-02-17",
        "2023-02-18",
        "2023-02-19",
        "2023-02-20",
        "2023-02-21",
        "2023-02-22",
        "2023-02-23"
      ],
      "value": [
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ]
    },
    "topUse": {
      "classroom": [],
      "value": []
    }
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» status|integer|true|none||none|
|» message|boolean|true|none||none|
|» data|object|true|none||none|
|»» time|string|true|none||数据更新时间|
|»» user|object|true|none||用户数据|
|»»» inActive|integer|true|none||none|
|»»» unActive|integer|true|none||none|
|»»» inUse|integer|true|none||none|
|»»» unUse|integer|true|none||none|
|»» classroom|object|true|none||教室数据|
|»»» inUse|integer|true|none||none|
|»»» inApproval|integer|true|none||none|
|»»» unUse|integer|true|none||none|
|»» record|object|true|none||申请记录数据|
|»»» date|[string]|true|none||none|
|»»» value|[integer]|true|none||none|
|»» topUse|object|true|none||教室使用数据|
|»»» classroom|[string]|true|none||none|
|»»» value|[string]|true|none||none|

# Area

## POST 更新区域信息

POST /area/update

> Body 请求参数

```json
{
  "areaId": "string",
  "name": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» areaId|body|string| 是 |区域ID|
|» name|body|string| 是 |none|

> 返回示例

> 成功

```json
{
  "status": 1,
  "message": true,
  "data": "更新区域成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 查询区域列表

GET /area/queryList

> 返回示例

> 成功

```json
{
  "status": 1,
  "message": true,
  "data": [
    {
      "id": 1,
      "name": "A区"
    },
    {
      "id": 2,
      "name": "B区"
    },
    {
      "id": 3,
      "name": "C区"
    },
    {
      "id": 4,
      "name": "D区"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» status|integer|true|none||none|
|» message|boolean|true|none||none|
|» data|[object]|true|none||none|
|»» id|integer|true|none||区域ID|
|»» name|string|true|none||区域名称|

## POST 添加区域信息

POST /area/add

> Body 请求参数

```json
{
  "name": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» name|body|string| 是 |none|

> 返回示例

> 成功

```json
{
  "status": 1,
  "message": true,
  "data": "添加区域成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 删除区域信息

GET /area/delete

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|areaId|query|integer| 否 |区域ID|

> 返回示例

> 成功

```json
{
  "status": 1,
  "message": true,
  "data": "删除区域成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

# Type

## POST 添加类型信息

POST /type/add

> Body 请求参数

```json
{
  "name": "string",
  "capacity": 0
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» name|body|string| 是 |类型名称|
|» capacity|body|integer| 是 |容量|

> 返回示例

> 成功

```json
{
  "status": 1,
  "message": true,
  "data": "添加类型成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## POST 更新类型信息

POST /type/update

> Body 请求参数

```json
{
  "typeId": 0,
  "name": "string",
  "capacity": 0
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» typeId|body|integer| 是 |类型ID|
|» name|body|string| 是 |类型名称|
|» capacity|body|integer| 是 |类型容量|

> 返回示例

> 成功

```json
{
  "status": 1,
  "message": true,
  "data": "更新类型成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 查询类型列表

GET /type/queryList

> 返回示例

> 成功

```json
{
  "status": 1,
  "message": true,
  "data": [
    {
      "id": 1,
      "name": "小型教室",
      "capacity": 30
    },
    {
      "id": 2,
      "name": "阶梯教室",
      "capacity": 90
    },
    {
      "id": 3,
      "name": "实验室",
      "capacity": 20
    },
    {
      "id": 4,
      "name": "多功能教室",
      "capacity": 40
    },
    {
      "id": 5,
      "name": "语音教室",
      "capacity": 10
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 删除类型信息

GET /type/delete

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|typeId|query|integer| 否 |类型ID|

> 返回示例

> 成功

```json
{
  "status": 1,
  "message": true,
  "data": "删除类型成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

# Stitute

## GET 删除学院信息

GET /stitute/delete

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|stituteId|query|integer| 否 |学院ID|

> 返回示例

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## POST 更新学院信息

POST /stitute/update

> Body 请求参数

```json
{
  "stituteId": 0,
  "stitute": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» stituteId|body|integer| 是 |学院ID|
|» stitute|body|string| 是 |学院名称|

> 返回示例

> 成功

```json
{
  "status": 1,
  "message": true,
  "data": "更新学院成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 查询学院列表

GET /stitute/queryList

> 返回示例

> 成功

```json
{
  "status": 1,
  "message": true,
  "data": [
    {
      "id": 1,
      "name": "国际商学院"
    },
    {
      "id": 2,
      "name": "国际设计学院"
    },
    {
      "id": 3,
      "name": "人文学院"
    },
    {
      "id": 4,
      "name": "信息工程学院"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## POST 添加学院信息

POST /stitute/add

> Body 请求参数

```json
{
  "stitute": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» stitute|body|string| 是 |none|

> 返回示例

> 成功

```json
{
  "status": 1,
  "message": true,
  "data": "添加学院成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

# 数据模型

<h2 id="tocS_ClassRoom">ClassRoom</h2>

<a id="schemaclassroom"></a>
<a id="schema_ClassRoom"></a>
<a id="tocSclassroom"></a>
<a id="tocsclassroom"></a>

```json
{
  "classroom_id": 0,
  "classroom_uuid": "string",
  "classroom_area": "string",
  "classroom_number": "string",
  "classroom_type": "string",
  "classroom_capacity": "string",
  "classroom_authority": "string",
  "classroom_available": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "deletedAt": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|classroom_id|integer|true|none||教室ID|
|classroom_uuid|string|true|none||UUID|
|classroom_area|string|true|none||教室区域|
|classroom_number|string|true|none||教室编号|
|classroom_type|string|true|none||教室类型|
|classroom_capacity|string|true|none||教室容纳人数|
|classroom_authority|string|true|none||教室申请权限限制|
|classroom_available|string|true|none||教室可用状态|
|createdAt|string|true|none||创建日期|
|updatedAt|string|true|none||更新日期|
|deletedAt|string|true|none||删除时间|

<h2 id="tocS_Admin">Admin</h2>

<a id="schemaadmin"></a>
<a id="schema_Admin"></a>
<a id="tocSadmin"></a>
<a id="tocsadmin"></a>

```json
{
  "admin_id": "string",
  "admin_uuid": "string",
  "admin_name": "string",
  "admin_password": "string",
  "admin_authority": "string",
  "deletedAt": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|admin_id|string|true|none||管理员ID|
|admin_uuid|string|true|none||UUID|
|admin_name|string|true|none||管理员姓名|
|admin_password|string|true|none||管理员密码|
|admin_authority|string|true|none||管理员权限|
|deletedAt|string|true|none||删除时间|

<h2 id="tocS_ClassroomRecord">ClassroomRecord</h2>

<a id="schemaclassroomrecord"></a>
<a id="schema_ClassroomRecord"></a>
<a id="tocSclassroomrecord"></a>
<a id="tocsclassroomrecord"></a>

```json
{
  "classroomRecord_id": "string",
  "classroomRecord_uuid": "string",
  "classroomRecord_user": "string",
  "classroomRecord_classroom": "string",
  "classroomRecord_start": "string",
  "classroomRecord_end": "string",
  "classroomRecord_status": "string",
  "classroomRecord_pass": "string",
  "classroomRecord_finish": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "deletedAt": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|classroomRecord_id|string|true|none||申请记录ID|
|classroomRecord_uuid|string|true|none||UUID|
|classroomRecord_user|string|true|none||申请用户ID|
|classroomRecord_classroom|string|true|none||申请教室ID|
|classroomRecord_start|string|true|none||申请使用开始时间|
|classroomRecord_end|string|true|none||申请使用结束时间|
|classroomRecord_status|string|true|none||申请审核状态|
|classroomRecord_pass|string|true|none||申请通过状态|
|classroomRecord_finish|string|true|none||申请和使用流程结束状态|
|createdAt|string|true|none||创建时间|
|updatedAt|string|true|none||更新时间|
|deletedAt|string|true|none||删除时间|

<h2 id="tocS_User">User</h2>

<a id="schemauser"></a>
<a id="schema_User"></a>
<a id="tocSuser"></a>
<a id="tocsuser"></a>

```json
{
  "user_id": 0,
  "user_uuid": "string",
  "user_number": 0,
  "user_email": "string",
  "user_password": "string",
  "user_name": "string",
  "user_stitute": "string",
  "user_authority": "string",
  "user_inApply": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "deletedAt": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|user_id|integer|true|none||用户ID|
|user_uuid|string|true|none||UUID|
|user_number|integer|true|none||用户编号|
|user_email|string|true|none||用户邮箱|
|user_password|string|true|none||用户密码|
|user_name|string|true|none||用户姓名|
|user_stitute|string|true|none||用户部门|
|user_authority|string|true|none||用户权限|
|user_inApply|string|true|none||是否在申请或使用状态|
|createdAt|string|true|none||创建日期|
|updatedAt|string|true|none||更新日期|
|deletedAt|string|true|none||删除时间|

