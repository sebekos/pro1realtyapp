const listingQuery = [
    {
        $limit: 10
    },
    {
        $lookup: {
            from: "profiles",
            localField: "agentid",
            foreignField: "user",
            as: "agentinfo"
        }
    },
    {
        $unwind: "$agentinfo"
    },
    {
        $project: {
            "agentinfo.active": 0,
            "agentinfo.user": 0,
            "agentinfo._id": 0,
            "agentinfo.date": 0,
            "agentinfo.__v": 0
        }
    }
];

const refinedMatch = (body) => {
    const order = (body.type && body.type.includes("Low")) || (body.type && body.type.includes("Oldest")) ? 1 : -1;
    const sortType = body.type && body.type.includes("Price") ? { price: order } : { listdate: order };
    const sortZip = body.zipcode && body.zipcode !== "" ? { $eq: body.zipcode } : { $ne: "---" };
    const sortGroup = body.group && body.group !== "All" ? { $regex: body.group } : { $ne: "" };
    const agent = body.agentid && body.agentid !== "" ? { $eq: body.agentid } : { $ne: "" };
    const currPage = body.page && body.page > -1 ? body.page : 0;
    return [
        {
            $match: {
                active: "1",
                zipcode: sortZip,
                type: sortGroup,
                agentid: agent
            }
        },
        {
            $sort: sortType
        },
        {
            $skip: currPage * 10
        }
    ];
};

const singleMatch = (id) => {
    return [
        {
            $match: {
                _id: ObjectId(`${id}`),
                active: "1"
            }
        },
        {
            $lookup: {
                from: "profiles",
                localField: "agentid",
                foreignField: "user",
                as: "agentinfo"
            }
        },
        {
            $unwind: "$agentinfo"
        },
        {
            $project: {
                "agentinfo.active": 0,
                "agentinfo.user": 0,
                "agentinfo._id": 0,
                "agentinfo.date": 0,
                "agentinfo.__v": 0
            }
        }
    ];
};

const setListingFields = (req) => {
    const listingProps = [
        "listdate",
        "status",
        "type",
        "address",
        "city",
        "state",
        "zipcode",
        "price",
        "soldprice",
        "bedroom",
        "bathroom",
        "squarefeet",
        "description"
    ];

    let listingFields = listingProps.reduce((memo, val) => {
        memo[val] = req.body[val];
        return memo;
    }, {});

    listingFields.agentid = req.user.id;
    return listingFields;
};

module.exports = {
    listingQuery,
    refinedMatch,
    singleMatch,
    setListingFields
};
