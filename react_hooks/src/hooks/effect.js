import React, {useEffect, useState} from "react";

function Effect() {
    let [names, setNames] = useState([])

    useEffect(() => {
            fetch('https://jsonplaceholder.typicode.com/users/')
                .then(respose => respose.json())
                .then(
                    data => setNames(data)
                )
        }, []
    );

    return (
        <div className="Apps">
            <div>
                {names.map((item, i) => (
                    <div key={new Date()}>
                        {item.name} {item.username}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Effect;