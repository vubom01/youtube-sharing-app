import { Col, List, notification, Row } from 'antd';
import React, { useContext, useEffect } from 'react';
import YouTube from 'react-youtube';
import { DEFAULT_PAGE_SIZE } from 'src/constants/common';
import { StoreContext } from 'src/contexts';
import { getYoutubeId } from 'src/helpers/youtube';
import { postHooks } from 'src/hooks';
import './ListPosts.css';
import { IPost } from 'src/interfaces/post';

export interface IListPostsProps {
  lastMessage: WebSocketEventMap['message'] | null;
}

const ListPosts = (props: IListPostsProps) => {
  const { lastMessage } = props;

  const { currentUser } = useContext(StoreContext);

  const [notificationApi, contextHolder] = notification.useNotification();

  const { loading, posts, total, params, setParams, setPosts, setTotal } =
    postHooks.useListPosts();

  useEffect(() => {
    if (!lastMessage) {
      return;
    }
    const newPost: IPost = JSON.parse(lastMessage.data);
    if (currentUser?.id !== newPost.userId) {
      openNotification(newPost);
    }
    setPosts([newPost, ...posts]);
    setTotal(total + 1);
  }, [lastMessage]);

  const openNotification = (newPost: IPost) => {
    notificationApi.open({
      message: (
        <div>
          New post from <b>{newPost.userEmail}</b>
        </div>
      ),
      description: <b>{newPost.title}</b>,
    });
  };

  return (
    <div>
      {contextHolder}
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
    </div>
  );
};

export default ListPosts;
