# College Classrooms Management System

---

###### Version: 0.0.1

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

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

# Classroom

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

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 提前退还教室

GET /classroom/refunds

> 返回示例

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

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

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

# ClassroomRecord

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

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 取消申请

GET /classroomRecord/cancelApply

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|classroomRecordId|query|string| 是 |申请表ID|

> 返回示例

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

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

# User

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

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## POST 修改密码

POST /user/modifyPassword

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

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 用户资料

GET /user/profile

> 返回示例

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## POST 更新资料

POST /user/update

> Body 请求参数

```json
{
  "number": "string",
  "email": "string",
  "name": "string",
  "stitute": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» number|body|string| 是 |用户编号|
|» email|body|string| 是 |邮箱|
|» name|body|string| 是 |真实姓名|
|» stitute|body|string| 是 |学院|

> 返回示例

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

# Admin

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

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 管理员资料

GET /admin/profile

> 返回示例

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

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

# Dashboard

## GET 数据面板查询

GET /dashboard/query

> 返回示例

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

# Area

## GET 删除区域信息

GET /area/delete

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|areaId|query|integer| 否 |区域ID|

> 返回示例

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 查询区域列表

GET /area/queryList

> 返回示例

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

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

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

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

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 查询类型列表

GET /type/queryList

> 返回示例

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

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

# Stitute

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

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

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

## GET 查询学院列表

GET /stitute/queryList

> 返回示例

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

