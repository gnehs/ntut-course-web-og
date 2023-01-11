//@ts-nocheck
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};
export default async function og(req: NextRequest) {
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
      return new ImageResponse(
        (
          <div
            style={{
              background: 'white',
              width: '100%',
              height: '100%',
              display: 'flex',
              textAlign: 'left',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            <div style={{
              fontSize: 24,
              padding: '32px',
            }}>
              北科課程好朋友
            </div>
            <div style={{ flex: 1 }} />
            <div style={{
              display: 'flex',
              textAlign: 'left',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              padding: '32px',
            }}>
              <div style={{
                fontSize: 36,
                opacity: 0.5,
              }}>
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
            </div>
            <div style={{ flex: 1 }} />
            <div style={{
              display: 'flex',
              marginTop: 24,
              gap: 32,
              padding: 32,
              background: '#f2f2f2',
              width: '100%',
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
              }}>
                <div style={{
                  fontSize: 24,
                }}>教師</div>
                <div style={{
                  fontSize: 24,
                  opacity: 0.5,
                }}>
                  {course.teacher.map(x => x.name).join('、')}
                </div>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
              }}>
                <div style={{
                  fontSize: 24,
                }}>班級</div>
                <div style={{
                  fontSize: 24,
                  opacity: 0.5,
                }}>
                  {course.class.map(x => x.name).join('、')}
                </div>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
              }}>
                <div style={{
                  fontSize: 24,
                }}>備註</div>
                <div style={{
                  fontSize: 24,
                  opacity: 0.5,
                }}>
                  {course.notes || '無'}
                </div>
              </div>
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 600,
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