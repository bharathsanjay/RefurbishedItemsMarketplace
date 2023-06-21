import React from 'react'
import {Col, Input, Modal, Row, Tabs} from "antd";
import {Form} from "antd";
import TextArea from "antd/es/input/TextArea";

function ProductForm({showProductForm, setShowProductForm}) {
    return (<Modal
        title=""
        open={showProductForm}
        onCancel={() => setShowProductForm(false)}
        centered
        width={1000}
    >

        <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="General" key="1">
                <Form layout="vertical">
                    <Form.Item label="name" name="name">
                        <Input type="Text"></Input>

                    </Form.Item>
                    <Form.Item label="Description" name="Description">
                        <TextArea type="text"></TextArea>
                    </Form.Item>

                    <Row gutter={[16,16]}>
                        <Col span={8}>
                            <Form.Item label="Price" name="Price">
                                <Input type="Number"></Input>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Category" name="Category">
                                <select>
                                    <option value="electronics">Electronics</option>
                                    <option value="fashion">Fashion</option>
                                    <option value="home">Home</option>
                                    <option value="sports">Sports</option>
                                </select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Age" name="Age">
                                <Input type="Number"></Input>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>


            </Tabs.TabPane>

            <Tabs.TabPane tab="Images" key="2"><h1>Images</h1></Tabs.TabPane>
        </Tabs>


    </Modal>);
}

export default ProductForm;