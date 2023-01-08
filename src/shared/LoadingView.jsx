import React from 'react';
import Loader from './Loader';

export default function LoadingView(){
    return (
        <div className="loading-screen">
            <div className="loading-view">
            <div className="loading-view-container">
                <div className="mb-3">
                    <Loader/>
                    </div>
                </div>
            </div>
        </div>
    )
}