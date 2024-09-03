import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Button, Popconfirm, Table, Tag } from 'antd';
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { Divider } from 'antd';
import CreateModal from './ModalAdmin/CreateModal';
import { getDetails, getDelete, getTags, getTitle } from '../../Services/ApiServices';
import UpdateModal from './ModalAdmin/UpdateModal';
import { GoArrowDown } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { FaBars } from "react-icons/fa6";
const ProfileAdmin = () => {
    const [data, setData] = useState([]);
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTitle, setSearchTitle] = useState("");
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
        total: 0,
    });
    const [showTagsOnly, setShowTagsOnly] = useState(false);
    const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [currentPost, setCurrentPost] = useState(null);
    const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
    const accessToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
    const [menuActive, setMenuActive] = useState(false);

    const isMobile = window.innerWidth <= 768;
    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    const handleLogout = () => {
        if (accessToken) {
            localStorage.removeItem('accessToken');
            sessionStorage.removeItem('accessToken');
            toast.success('Logged out successfully!');
            window.location.href = '/warehouse';
        } else {
            toast.info('No active session to log out from.');
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            render: (tags) => {
                if (!Array.isArray(tags)) {
                    tags = tags ? [tags] : [];
                }

                return (
                    <>
                        {tags.map((tag, index) => (
                            <Tag color="blue" key={index} style={{ marginBottom: '5px' }}>
                                <div style={{
                                    maxHeight: '40px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'pre-wrap',
                                    wordWrap: 'break-word',
                                }}>
                                    <code>{tag}</code>
                                </div>
                            </Tag>
                        ))}
                    </>
                );
            },
        },
        {
            title: 'Actions',
            dataIndex: 'Actions',
            fixed: 'right',
            width: isMobile ? 90 : 120,
            render: (value, record) => {

                return (
                    <div className='flex Actions-record'>
                        <button onClick={() => {
                            setCurrentPost(record);
                            setIsModalOpenUpdate(true);
                        }}><FaPencilAlt />
                        </button>
                        <div className='mr-6'></div>

                        <Popconfirm
                            title="Delete the data."
                            description={`Are you sure to delete this?`}
                            onConfirm={() => confirm(record.id)}
                            okText="Yes"
                            cancelText="No"
                            className='Actions-MdDelete'
                        >
                            <MdDelete />
                        </Popconfirm>
                    </div>)
            }
        },
    ];

    const tagsColumns = [
        {
            title: 'Tags',
            dataIndex: 'tag',
            render: (tag) => (
                <Tag color="blue" style={{ marginBottom: '5px' }}>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '5px',
                    }}>
                        <code>{tag}</code>
                    </div>
                </Tag>
            ),
        }
    ];

    const fetchData = async (page, pageSize, title = '') => {
        if (!accessToken) {
            toast.error('Access token is missing. Please log in.');
            return;
        }

        setLoading(true);
        try {
            let res;
            if (title) {
                res = await getTitle(accessToken, title, page);
            } else {
                res = await getDetails(accessToken);
            }
            const { posts, total } = res;
            const totalPages = Math.ceil(total / pageSize);

            setData(posts);
            setPagination({
                current: page,
                pageSize: pageSize,
                total: total,
                totalPages: totalPages
            });
        } catch (error) {
            toast.error('Failed to fetch data');
        }
        setLoading(false);
    };

    const fetchTags = async () => {
        if (!accessToken) {
            toast.error('Access token is missing. Please log in.');
            return;
        }

        try {
            const tagsData = await getTags(accessToken);
            const formattedTags = tagsData.map(tag => ({ tag }));
            setTags(formattedTags);
        } catch (error) {
            toast.error('Failed to fetch tags');
        }
    };

    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize);
        fetchTags();
    }, [pagination.current, pagination.pageSize]);

    const handleTableChange = (newPagination) => {
        setPagination({
            ...pagination,
            current: newPagination.current,
            pageSize: newPagination.pageSize,
        });
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedKeys) => {
            setSelectedRowKeys(selectedKeys);
        },
    };

    const confirm = async (id) => {
        try {
            if (!accessToken) {
                toast.error('Access token is missing. Please log in.');
                return;
            }
            await getDelete(accessToken, id);
            toast.success('Post deleted successfully');
            fetchData(pagination.current, pagination.pageSize);
        } catch (error) {
            toast.error('Failed to delete post');
        }
    };

    const handleDeleteAll = async () => {
        try {
            if (!accessToken) {
                toast.error('Access token is missing. Please log in.');
                return;
            }
            for (const id of selectedRowKeys) {
                await getDelete(accessToken, id);
            }
            toast.success('Posts deleted successfully');
            fetchData(pagination.current, pagination.pageSize);
            setSelectedRowKeys([]);
            setMenuActive(false);
        } catch (error) {
            toast.error('Failed to delete posts');
        }
    };

    const cancelDeleteAll = () => {
        setSelectedRowKeys([]);
    };

    const deleteAllConfirm = () => (
        <Popconfirm
            title="Are you sure you want to delete all selected posts?"
            description="This action cannot be undone."
            onConfirm={handleDeleteAll}
            onCancel={cancelDeleteAll}
            okText="Yes"
            cancelText="No"
        >
            <Button className='Delete-post' data-aos="zoom-in" data-aos-delay="400">Delete All</Button>
        </Popconfirm>
    );

    const handleCreateSuccess = () => {
        fetchData(pagination.current, pagination.pageSize);
        setMenuActive(false);
    };

    const handleSearch = () => {
        fetchData(pagination.current, pagination.pageSize, searchTitle);
        setSearchTitle('');
        setMenuActive(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
            setMenuActive(false);
        }
    };

    const handleToggleTags = () => {
        setShowTagsOnly(!showTagsOnly);
        setMenuActive(false);
    };

    const handleCreateNewPost = () => {
        setIsModalOpenCreate(true);
        setMenuActive(false);
    };

    return (
        <div className='ProfileAdmin flex'>
            <div className='ProfileAdmin-left'>
                <div className='ProfileAdmin-left-svg'>
                    <Link to="/warehouse">
                        <svg width="49" height="36" viewBox="0 0 49 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="15.8323" width="19.8758" height="19.8758" rx="9.93789" fill="#9C69E2" />
                            <rect x="28.8203" y="0.925446" width="19.8758" height="34.7826" rx="9.93789" fill="#F063B8" />
                        </svg>
                    </Link>
                    <div className='ProfileAdmin-left-span'>
                        <p data-aos="fade-right" data-aos-delay="200" >Home</p>
                        <span data-aos="fade-right" data-aos-delay="400" >Posts</span>
                        <p onClick={handleLogout} data-aos="fade-right" data-aos-delay="600" >Logout</p>
                    </div>
                </div>
            </div>

            <div className={`sidebar-menu ${menuActive ? 'active' : ''}`}>
                <div className=''>
                    <div className='sidebar-menuApp flex'>
                        <Link to="/warehouse" className='sidebar-menuApp-svg'>
                            <svg width="60" height="50" viewBox="0 0 49 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect y="15.8323" width="19.8758" height="19.8758" rx="9.93789" fill="#9C69E2" />
                                <rect x="28.8203" y="0.925446" width="19.8758" height="34.7826" rx="9.93789" fill="#F063B8" />
                            </svg>
                        </Link>
                        <div className='sidebar-menuApp-span flex'>
                            <span>Posts</span>
                            <p onClick={handleLogout}>Logout</p>
                        </div>
                    </div>
                    <div className='mobiApp-new'>

                        <button className='Create-new-post ptA'
                            onClick={handleCreateNewPost}
                            data-aos="zoom-in" data-aos-delay="600"
                        >
                            Add new
                        </button>
                        {selectedRowKeys.length > 0 && deleteAllConfirm()}
                        <div className='rightNew-post' data-aos="zoom-in" data-aos-delay="600">
                            <div className='flex Search-Title'>
                                <input className='rightNew-title' placeholder='Title'
                                    value={searchTitle}
                                    onChange={(e) => setSearchTitle(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                                <button className='search-data'
                                    onClick={handleSearch}
                                ><CiSearch /></button>
                            </div>
                            <button className='rightNew-tags flex'
                                onClick={handleToggleTags}
                            >Tags <GoArrowDown />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='ProfileAdmin-right relative'>
                <h2 className='Bar_Amo absolute Manage-Admin'
                    onClick={() => window.location.reload()}
                >Manage</h2>
                <div className='Bar_Amo absolute right-2' onClick={toggleMenu}><FaBars /></div>
                <div className='overflow-mobiApp'>
                    <div className='flex relative mobiApp-new'>
                        <button className='Create-new-post'
                            onClick={() => setIsModalOpenCreate(true)}
                            data-aos="zoom-in" data-aos-delay="600"
                        >
                            Add new
                        </button>
                        {selectedRowKeys.length > 0 && deleteAllConfirm()}
                        <div className='rightNew-post flex absolute right-5' data-aos="zoom-in" data-aos-delay="600">
                            <div className='flex Search-Title'>
                                <input className='rightNew-title' placeholder='Title'
                                    value={searchTitle}
                                    onChange={(e) => setSearchTitle(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                                <button className='search-data'
                                    onClick={handleSearch}
                                ><CiSearch /></button>
                            </div>
                            <button className='rightNew-tags flex'
                                onClick={() => setShowTagsOnly(!showTagsOnly)}
                            >Tags <GoArrowDown />
                            </button>
                        </div>
                    </div>

                    <div data-aos="zoom-in" data-aos-delay="800" className='table-mobiA'>
                        <Divider />
                        <Table
                            columns={showTagsOnly ? tagsColumns : columns}
                            dataSource={showTagsOnly ? tags : data}
                            pagination={!showTagsOnly ? {
                                current: pagination.current,
                                pageSize: pagination.pageSize,
                                total: pagination.total,
                            } : false}
                            loading={loading}
                            rowSelection={!showTagsOnly ? rowSelection : undefined}
                            onChange={!showTagsOnly ? handleTableChange : undefined}
                            rowKey="id"
                            scroll={{
                                x: 1200,
                            }}
                            bordered
                        />
                    </div>
                </div>
            </div>
            <CreateModal
                accessToken={accessToken}
                show={isModalOpenCreate}
                handleClose={() => setIsModalOpenCreate(false)}
                onSuccess={handleCreateSuccess}
            />
            <UpdateModal
                accessToken={accessToken}
                visible={isModalOpenUpdate}
                dataUpdate={currentPost}
                onUpdate={handleCreateSuccess}
                onClose={() => setIsModalOpenUpdate(false)}
            />
            <ToastContainer />
        </div>
    )
}

export default ProfileAdmin