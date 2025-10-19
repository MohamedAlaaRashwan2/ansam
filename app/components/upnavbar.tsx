
export default function upnavbar(){
    return(
        <div className="{styles.topHeader}">
            <div className="col-6">
                <div className="top-header-content">
                    <a href="#"><i className="icon_phone"></i> <span>(123) 456-789-1230</span></a>
                    <a href="#"><i className="icon_mail"></i> <span>info.colorlib@gmail.com</span></a>
                </div>
            </div>

            <div className="col-6">
                <div className="top-header-content">
                     <div className="top-social-area ml-auto">
                        <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                        <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                        <a href="#"><i className="fa fa-tripadvisor" aria-hidden="true"></i></a>
                        <a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                     </div>
                </div>
            </div>
        </div>
    );
};