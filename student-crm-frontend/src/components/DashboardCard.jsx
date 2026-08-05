function DashboardCard({

    title,

    count,

    icon,

    color

}) {

    return (

        <div className="col-xl-3 col-lg-4 col-md-6 mb-3">

            <div
                className={`card ${color} border-0 shadow-sm`}
                style={{

                    borderRadius: "15px",

                    height: "135px"

                }}
            >

                <div className="card-body d-flex align-items-center justify-content-between">

                    <div>

                        <h6
                            className="text-white mb-2"
                        >

                            {title}

                        </h6>

                        <h2
                            className="text-white fw-bold"
                        >

                            {count}

                        </h2>

                    </div>

                    <div
                        style={{

                            fontSize: "42px"

                        }}
                    >

                        {icon}

                    </div>

                </div>

            </div>

        </div>

    );

}

export default DashboardCard;