import React, {useState, useEffect} from 'react';
import {database} from '../../controller/libs/firestore';
import PostItem from './PostItem';
import './Dashboard.scss';

const LIMIT = 10;

const Dashboard = (displayCount=10) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => database.collection('reports').limit(LIMIT).onSnapshot(snapshot => {
        let feedposts = [];
        snapshot.forEach(doc => {feedposts.push({id: doc.id, ...doc.data()})});
        setPosts([...feedposts]);
    }), [displayCount]);

    useEffect(() => {
        console.log(posts);
    }, [posts]);

    return (
        <div className="dash-wrapper">
            {posts.map(data => <PostItem key={data.id} {...data} />)}
        </div>
    );
}

export default Dashboard;