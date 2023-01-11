//@ts-nocheck
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';


const font = fetch(new URL('../../assets/Lato-Regular.ttf', import.meta.url)).then(
  (res) => res.arrayBuffer(),
);

export const config = {
  runtime: 'edge',
};
export default async function og(req: NextRequest) {
  const fontData = await font;

  const FooterItem = ({ title, value }) =>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '33.33%'
    }}>
      <div style={{
        fontSize: 24,
      }}>{title}</div>
      <div style={{
        fontSize: 24,
        opacity: 0.5,
        width: '100%'
      }}>
        {value || '無'}
      </div>
    </div>
  const Container = ({ children }) =>
    <div
      style={{
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        display: 'flex',
        textAlign: 'left',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        fontFamily: 'Lato',
        alignItems: 'flex-start',
        fontSize: 24,
      }}
      lang="zh-TW"
    >{children}</div>
  const Tag = ({ children }) =>
    <div style={{
      fontSize: 24,
      border: `1px solid #f2f2f2`,
      padding: '8px 16px',
      borderRadius: 12,
      boxShadow: `0 4px 8px rgba(0,0,0,.1)`
    }}>
      {children}
    </div>

  const { searchParams } = new URL(req.url)
  const hasYear = searchParams.has('year');
  const hasSem = searchParams.has('sem');
  const hasId = searchParams.has('id');
  if (hasYear && hasSem && hasId) {
    let year = searchParams.get('year');
    let sem = searchParams.get('sem');
    let department = searchParams.get('d') || 'main'
    let id = searchParams.get('id');
    const courses = await fetch(`https://gnehs.github.io/ntut-course-crawler-node/${year}/${sem}/${department}.json`).then((res) => res.json());
    const course = courses.find(x => x.id === id);
    if (course) {
      const courseStandardList = {
        '○': '部訂共同必修',
        '△': '校訂共同必修',
        '☆': '共同選修',
        '●': '部訂專業必修',
        '▲': '校訂專業必修',
        '★': '專業選修'
      }
      const courseStandard = `📕 ${courseStandardList[course.courseType]}`
      return new ImageResponse(
        (
          <Container>
            <div style={{
              padding: '32px 64px',
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}>
              <div>🍤 北科課程好朋友</div>
              <div style={{ opacity: .5 }}>ntut-course.gnehs.net</div>
            </div>
            <div style={{
              display: 'flex',
              textAlign: 'left',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              padding: `32px 64px`,
            }}>
              <div>
                {course.id}
              </div>
              <div style={{
                fontSize: 56,
              }}>
                {course.name.zh}
              </div>
              <div style={{
                fontSize: 36,
                opacity: 0.5,
              }}>
                {course.name.en}
              </div>
              <div style={{
                display: 'flex',
                gap: 8,
                marginTop: 16,
              }}>
                <Tag>{courseStandard}</Tag>
                <Tag>{`${course.credit} 學分`}</Tag>
                {course.classroom.map(x => `🚪 ${x.name}`).map(x =>
                  <Tag key={x} > {x} </Tag>
                )}
              </div>
            </div>
            <div style={{ flex: 1 }} />
            <div style={{
              display: 'flex',
              gap: 64,
              padding: `32px 64px`,
              background: '#f2f2f2',
              width: '100%',
            }}>
              <FooterItem title="教師" value={course.teacher.map(x => x.name).join('、')} />
              <FooterItem title="班級" value={course.class.map(x => x.name).join('、')} />
              <FooterItem title="備註" value={course.notes} />
            </div>
          </Container>
        ),
        {
          width: 1200,
          height: 600,
          emoji: "fluent",
          fonts: [
            {
              name: 'Lato',
              data: fontData,
              style: 'normal',
            },
          ],
        },
      );
    }
  }
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        北科課程好朋友
      </div>
    ),
    {
      width: 1200,
      height: 600,
    },
  );



}