This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# 北科課程好朋友 SNS 預覽圖產生器
這是一個可以產生北科課程好朋友 SNS 預覽圖的網站，可以在 https://ntut-course-og.gnehs.net/ 看到。
## API
### 課程
![](https://ntut-course-og.gnehs.net/api?year=111&sem=2&id=311408)
#### Example
```
https://ntut-course-og.gnehs.net/api?year=111&sem=2&id=311408
```
#### Parameters
| Name | Description |
| --- | --- |
| year | 課程年度，例如 `111` |
| sem | 課程學期，例如 `1` 或 `2` |
| id | 課程代碼，例如 `311408` |
| department | 學制，預設為 `main`，也可以填入 `研究所(日間部、進修部、週末碩士班)`、`進修部` |

### 教師
![](https://ntut-course-og.gnehs.net/api/teacher?name=陳銘崑)
#### Example
```
https://ntut-course-og.gnehs.net/api/teacher?name=陳銘崑
```
#### Parameters
| Name | Description |
| --- | --- |
| name | 教師姓名 |
### 班級
![](https://ntut-course-og.gnehs.net/api/class?year=109&sem=2&id=2529)
#### Example
```
https://ntut-course-og.gnehs.net/api/class?year=109&sem=2&id=2529
```
#### Parameters
| Name | Description |
| --- | --- |
| year | 課程年度，例如 `109` |
| sem | 課程學期，例如 `1` 或 `2` |
| id | 課程代碼，例如 `2529` |


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
