import { Col, List, Row } from 'antd';
import { getYoutubeId } from 'helpers/youtube';
import { IPost } from 'interfaces/post';
import React from 'react';
import YouTube from 'react-youtube';
import './index.css';

const data: IPost[] = [
  {
    id: 1,
    userId: 1,
    userEmail: 'test@gmail.com',
    youtubeURL: 'https://www.youtube.com/watch?v=yQ5Gvd3Or8s',
    title:
      'BA ƠI - Robber gửi gắm tình yêu gia đình vào bản rap đong đầy cảm xúc | Rap Việt 2024 [Live Stage]',
    description:
      'BA ƠI - Robber gửi gắm tình yêu gia đình vào bản rap đong đầy cảm xúc | Rap Việt 2024 [Live Stage]\n' +
      '\n' +
      '#rapviệt2024 #rapviet2024 #Robber\n' +
      '#DatVietVAC #VieChannel #VieON\n' +
      '#30NamCoMotDatViet \n' +
      '\n' +
      'Xem Full Rap Việt 2024 tại đây: https://youtu.be/JOkLc8ynaFo\n' +
      '\n' +
      '▶ Tìm nghe các bản audio Tập 1 RAP VIỆT 2024 trên: https://WMVN.lnk.to/RV2024-EP1\n' +
      '▶ Follow playlist RAP VIỆT để được cập nhật sớm nhất khi audio được phát hành: https://WMVN.lnk.to/RAPVIET \n' +
      ' \n' +
      'Đón xem #RapViệt2024 phát sóng trên kênh truyền hình Vie Channel - HTV2, Vie GIẢITRÍ và ứng dụng VieON\n' +
      '\n' +
      'Rap Việt được mua bản quyền từ chương trình đình đám tại Thái Lan – The Rapper, đây là format từng đạt nhiều giải thưởng vang dội như Giải thưởng truyền hình châu Á lần thứ 23 – 2018 với hạng mục Chương trình giải trí tổng hợp hay nhất, Giải thưởng sáng tạo của Viện hàn lâm châu Á 2019, Giải thưởng Zocial Awards Thái Lan 2019 - Giải thưởng giải trí hay nhất trên mạng xã hội.\n' +
      '\n' +
      '👉 Xem sớm nhất trên ứng dụng VieON: https://click.vieon.vn/wSBG/ytrvm3\n' +
      '\n' +
      '★ Mọi nhu cầu quảng cáo và tài trợ xin liên hệ: Công Ty Cổ Phần Vie Channel\n' +
      '► Hotline: 0907.950.371 (Mr. Đức Khoa)\n' +
      '► Email: khoa.nguyen@viechannel.vn hoặc sales@viechannel.vn\n' +
      '\n' +
      'Tải app VieON tại: https://click.vieon.vn/wSBG/ytapp\n' +
      '\n' +
      'Xem các chương trình hấp dẫn khác của Vie Channel:\n' +
      '►Anh Trai Say Hi Full: https://bit.ly/AnhTraiSayHi\n' +
      '►Rap Việt Full: https://bit.ly/RAPVIETSS3\n' +
      '►Người Ấy Là Ai Full: https://bit.ly/NALASS5\n' +
      '►The Masked Singer Vietnam Full: https://bit.ly/TMSVNSS2\n' +
      '\n' +
      'Hoặc xem thêm trên hệ thống Vie Channel:\n' +
      '►Website: http://viechannel.vn/\n' +
      '►Fanpage: https://www.facebook.com/VieChannelHTV2/\n' +
      '►Instagram: https://www.instagram.com/viechannelhtv2/',
    createdAt: 1,
  },
  {
    id: 1,
    userId: 1,
    userEmail: 'test',
    youtubeURL: 'https://www.youtube.com/watch?v=yQ5Gvd3Or8s',
    title:
      'BA ƠI - Robber gửi gắm tình yêu gia đình vào bản rap đong đầy cảm xúc | Rap Việt 2024 [Live Stage]',
    description:
      'BA ƠI - Robber gửi gắm tình yêu gia đình vào bản rap đong đầy cảm xúc | Rap Việt 2024 [Live Stage]\n' +
      '\n' +
      '#rapviệt2024 #rapviet2024 #Robber\n' +
      '#DatVietVAC #VieChannel #VieON\n' +
      '#30NamCoMotDatViet \n' +
      '\n' +
      'Xem Full Rap Việt 2024 tại đây: https://youtu.be/JOkLc8ynaFo\n' +
      '\n' +
      '▶ Tìm nghe các bản audio Tập 1 RAP VIỆT 2024 trên: https://WMVN.lnk.to/RV2024-EP1\n' +
      '▶ Follow playlist RAP VIỆT để được cập nhật sớm nhất khi audio được phát hành: https://WMVN.lnk.to/RAPVIET \n' +
      ' \n' +
      'Đón xem #RapViệt2024 phát sóng trên kênh truyền hình Vie Channel - HTV2, Vie GIẢITRÍ và ứng dụng VieON\n' +
      '\n' +
      'Rap Việt được mua bản quyền từ chương trình đình đám tại Thái Lan – The Rapper, đây là format từng đạt nhiều giải thưởng vang dội như Giải thưởng truyền hình châu Á lần thứ 23 – 2018 với hạng mục Chương trình giải trí tổng hợp hay nhất, Giải thưởng sáng tạo của Viện hàn lâm châu Á 2019, Giải thưởng Zocial Awards Thái Lan 2019 - Giải thưởng giải trí hay nhất trên mạng xã hội.\n' +
      '\n' +
      '👉 Xem sớm nhất trên ứng dụng VieON: https://click.vieon.vn/wSBG/ytrvm3\n' +
      '\n' +
      '★ Mọi nhu cầu quảng cáo và tài trợ xin liên hệ: Công Ty Cổ Phần Vie Channel\n' +
      '► Hotline: 0907.950.371 (Mr. Đức Khoa)\n' +
      '► Email: khoa.nguyen@viechannel.vn hoặc sales@viechannel.vn\n' +
      '\n' +
      'Tải app VieON tại: https://click.vieon.vn/wSBG/ytapp\n' +
      '\n' +
      'Xem các chương trình hấp dẫn khác của Vie Channel:\n' +
      '►Anh Trai Say Hi Full: https://bit.ly/AnhTraiSayHi\n' +
      '►Rap Việt Full: https://bit.ly/RAPVIETSS3\n' +
      '►Người Ấy Là Ai Full: https://bit.ly/NALASS5\n' +
      '►The Masked Singer Vietnam Full: https://bit.ly/TMSVNSS2\n' +
      '\n' +
      'Hoặc xem thêm trên hệ thống Vie Channel:\n' +
      '►Website: http://viechannel.vn/\n' +
      '►Fanpage: https://www.facebook.com/VieChannelHTV2/\n' +
      '►Instagram: https://www.instagram.com/viechannelhtv2/',
    createdAt: 1,
  },
];

export const ListPosts = () => {
  return (
    <div
      style={{
        maxWidth: '50%',
        alignItems: 'center',
        margin: 'auto',
      }}
    >
      <List
        itemLayout="vertical"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.title}>
            <Row gutter={[10, 10]}>
              <Col span={14}>
                <div className="video-container">
                  <YouTube
                    videoId={getYoutubeId(item.youtubeURL)!}
                    opts={{ playerVars: { autoplay: 1 } }}
                  />
                </div>
              </Col>
              <Col span={10}>
                <List.Item.Meta
                  title={item.title}
                  description={
                    item.description.length > 100
                      ? `${item.description.substring(0, 100)}...`
                      : item.description
                  }
                />
                <div>
                  Shared by: <b>{item.userEmail}</b>
                </div>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  );
};
