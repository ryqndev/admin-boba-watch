import React from 'react';
import {database} from '../../controller/libs/firestore';
import { add } from 'date-fns';

const PostItem = ({id, post}) => {
    const remove = () => {
        let batch = database.batch();
        batch.delete(database.collection('reports').doc(id));
        batch.delete(database.collection('blogs').doc(id));
        batch.commit().then(() => {

        }).catch(console.log);
    }
    const ban = (length) => {
        let batch = database.batch();
        batch.set(
            database.collection(`users/${post.uid}/blog`).doc('user'), 
            {
                restrictedUntil: (add(new Date(), length)).toISOString()
            }, 
            {
                merge: true
            }
        );
        batch.delete(database.collection('reports').doc(id));
        batch.delete(database.collection('blogs').doc(id));
        batch.commit().then(() => {

        }).catch(console.log);
    }

    return (
        <div className="card">
            <h2>{post.person.name}</h2>
            <span>{post.person.location}</span>
            <p>{post.person.bio}</p>
            <img src={post.person.profile} alt=" "/>

            {post.desc}
            
            <button onClick={remove}>REMOVE</button>
            <button onClick={ban.bind(null, {days: 2})}>BAN</button>
        </div>
    )
}

export default PostItem;
