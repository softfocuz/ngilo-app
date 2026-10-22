import React, { useEffect, useState } from 'react';

function GenerateLink() {
    const [link, setLink] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        console.log("Stored user:", storedUser);

        if (storedUser) {
            const user = JSON.parse(storedUser);
            console.log("Parsed user:", user);
            console.log("User ID:", user.userId);

            if (user.userId) {
                setLink(`${window.location.origin}/send/${user.userId}`);
            }
        }
    }, []);

    return (
        <div className="card center">
            <h2>Your Unique Link</h2>
            {link ? (
                <>
                    <p className="link-box">{link}</p>
                    <button
                        className="btn"
                        onClick={() =>{
                            navigator.clipboard.writeText(link);
                            alert('Link copied to clipboard!');
                        }}
                    >
                        Copy Link
                    </button>
                </>
            ) : (
                <p>Loading your link...</p>
            )}
        </div>
    );
}
 
export default GenerateLink;