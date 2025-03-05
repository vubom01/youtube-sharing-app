import { Col, List, Row } from 'antd';
import { DEFAULT_PAGE_SIZE } from 'constants/common';
import { getYoutubeId } from 'helpers/youtube';
import { postHooks } from 'hooks';
import React from 'react';
import YouTube from 'react-youtube';
import './index.css';

export const ListPosts = () => {
  const { loading, posts, total, params, setParams } = postHooks.useListPosts();

  return (
    <div
      style={{
        maxWidth: '50%',
        alignItems: 'center',
        margin: 'auto',
        paddingTop: '10px',
      }}
    >
      <div>
        Total: <b>{total} videos</b>
      </div>
      <List
        loading={loading}
        itemLayout="vertical"
        pagination={{
          current: params.page,
          pageSize: DEFAULT_PAGE_SIZE,
          total: total,
          onChange: (newPage) =>
            setParams({
              page: newPage,
              pageSize: params.pageSize,
            }),
        }}
        dataSource={posts}
        renderItem={(item) => (
          <List.Item key={item.title}>
            <Row gutter={[10, 10]}>
              <Col span={14}>
                <div className="video-container">
                  <YouTube videoId={getYoutubeId(item.youtubeURL)!} />
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
