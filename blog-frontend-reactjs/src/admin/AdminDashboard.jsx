import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import axios from 'axios';
import GoBack from '../components/goBack';

const AdminDashboard = () => {
    const [data, setData] = useState([]);

    const [search, setSearch] = useState("");

    const [filteredName, setFilteredName] = useState([]);


    const getPost = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/posts/view', {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,    // IMPORTANT!!!
            })
            setData(response.data.posts);
            setFilteredName(response.data.posts);
            console.log(response.data.posts)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getPost();
    }, [])



    // filter by name function
    useEffect(() => {
        const result = data?.filter((userName) => {
            return userName?.postedBy?.name.toLowerCase().match(search.toLowerCase());
        });

        setFilteredName(result);
    }, [search]);


    // productList.filter((productList) =>productList.category === {category})



    const columns = [
        {
            name: "Posted By",
            selector: (row) => row?.postedBy?.name,
            sortable: true
        },
        {
            name: "Title",
            selector: (row) => row?.title,
        },
        {
            name: "Content",
            selector: (row) => <div dangerouslySetInnerHTML={{ __html: row?.content }}></div>,
        },
        {
            name: "Image",
            selector: (row) => <img width={50} height={50} src={row?.image?.url} />,
        },
        // {
        //     name: "User Pic",
        //     selector: (row) => <img width={50} height={50} src={row?.userPic?.profilePic?.url} />,
        // },
        {
            name: "Likes",
            selector: (row) => row?.likes,
        },
        {
            name: "Comments",
            selector: (row) => row?.comments,
        },
        {
            name: "Created At",
            selector: (row) => row.createdAt,
            renderCell: (params) => (
                moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS')
            ),
        },
        {
            name: "Action",
            cell: row =>
                <button
                    onClick={() => alert(row?._id)}
                >
                    Edit
                </button>
        },
        {
            cell: row =>
                <button
                    onClick={() => alert(row?._id)}
                >
                    Delete
                </button>
        }
    ]




    return (
        
        <div>
            <GoBack />
            <DataTable
                columns={columns}
                data={filteredName}
                pagination
                fixedHeader
                fixedHeaderScrollHeight='480px'
                highlightOnHover
                // actions = {
                //     <button>Export</button>
                // }


                // seach component
                subHeader
                subHeaderComponent={
                    <input
                        type="text"
                        placeholder='Search here...'
                        className='border-2 px-3 py-1 rounded-md'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                }
                // subHeaderAlign='left'
            />

            {/* {
                data?.map((post, i) => {
                    return (
                        <div key={i}>
                            <p>{post?.title}</p>
                            <p>{post?.content}</p>
                            <p>{post?.postedBy.name}</p>
                            <img width={50} height={50} src={post?.image} />
                            
                        </div>
                    )
                })
            } */}
        </div>
    )
}

export default AdminDashboard