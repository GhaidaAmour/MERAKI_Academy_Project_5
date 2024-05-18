import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setSpatlization } from "../../service/redux/reducers/specialization/clinicSpecialization";
import { Carousel } from "react-bootstrap";
import "../Sptilization/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PiHandshakeThin } from "react-icons/pi";
import { IoPersonSharp } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import {
  faSearch,
  faStar,
  faCheckCircle,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { setSpatlizationById } from "../../service/redux/reducers/specialization/clinicSptlizationById";
import { useNavigate } from "react-router-dom";

function Index() {
  const [searchItem, setSearchItem] = useState("");

  const dispatch = useDispatch();
  const clinic = useSelector(
    (state) => state.clinicSpecialization.spatlization
  );
  const clinicSptlization = useSelector(
    (state) => state.clinicSptlizationById.setSpatlizationById
  );
  const [currentImage, setCurrentImage] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide] = useState(4);
  const navigate = useNavigate();
  const images = [
    "https://media.istockphoto.com/id/1473559425/photo/female-medical-practitioner-reassuring-a-patient.jpg?s=612x612&w=0&k=20&c=kGbm-TE5qdppyyiteyip7_CzKLktyPrRuWD4Zz2EcqE=",
    "https://www.shutterstock.com/image-photo/indian-male-doctor-consulting-senior-600nw-2036186195.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-RoQzESk-kGfKXS7eClXsPOJQ7kOyFeTYgw&s",
    "https://www.verywellhealth.com/thmb/Iiq1w0oRU3M7cWuewQq0-L3-fCw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1255592872-6dc47a1d2f4d4bcaba072aeac7b2118d.jpeg",
    "https://www.proteethguard.com/product_images/uploaded_images/doctor-or-dentist-for-tmj-20220319.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(
        currentImage === images.length - 1 ? 0 : currentImage + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [currentImage, images.length]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/specialization/")
      .then((res) => {
        dispatch(setSpatlization(res.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  const handleSelect = (selectedIndex, e) => {
    setCurrentIndex(selectedIndex);
  };
  const handleSpecializationClick = (id) => {
    navigate(`/specialization/${id}`);
  };

  return (
    <div>
      <div className="image-container">
        <img
          src={images[currentImage]}
          alt={`image ${currentImage + 1}`}
          style={{ height: "80vh", width: "100%" }}
        />
      </div>
      <div
        className="text-container"
        style={{ textAlign: "center", margin: "40px" }}
      >
        <h1 style={{ padding: "10px" }}>احجز كشفك حسب تخصصك</h1>
        <Carousel
          activeIndex={currentIndex}
          onSelect={handleSelect}
          style={{ margin: "0 auto", width: "80%" }}
        >
          {clinic.map((item, index) =>
            index % itemsPerSlide === 0 ? (
              <Carousel.Item key={index}>
                <div className="d-flex justify-content-between">
                  {clinic
                    .slice(index, index + itemsPerSlide)
                    .map((specialization, subIndex) => (
                      <div
                        key={subIndex}
                        className="text-center"
                        style={{ width: "30%" }}
                        onClick={() =>
                          handleSpecializationClick(specialization.id)
                        }
                      >
                        <div
                          className="card"
                          style={{ width: "90%", margin: "auto" }}
                        >
                          <img
                            src={specialization.image_specialization}
                            alt={specialization.name_specialization}
                            className="card-img-top"
                            style={{ width: "100%", minHeight: "300px" }}
                          />
                          <div className="card-body">
                            <h5 className="card-title">
                              {specialization.name_specialization}
                            </h5>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </Carousel.Item>
            ) : null
          )}
        </Carousel>
      </div>

      <div className="rating">
        <div className="container">
          <div className="row pt-5 pb-5">
            <div className="col-3">
              <div className="text-center">
                <img src="https://d1aovdz1i2nnak.cloudfront.net/vezeeta-web-reactjs/58776/_next/static/images/medical-care-icon.svg"></img>
              </div>
              <h3>كل احتياجاتك على فيزيتا</h3>
              <h5>ابحث و احجز كشف مع دكتور في عيادة أو مستشفى.</h5>
            </div>
            <div className="col-3">
              <div className="text-center">
                <img src="https://d1aovdz1i2nnak.cloudfront.net/vezeeta-web-reactjs/58776/_next/static/images/doctor-icon.svg" />
              </div>
              <h3>تقييمات حقيقية من المرضى</h3>
              <h5>
                تقييمات الدكاترة من مرضى حجزوا على فيزيتا و زاروا الدكتور
                بالفعل.
              </h5>
            </div>
            <div className="col-3">
              <div className="text-center">
                <img src="https://d1aovdz1i2nnak.cloudfront.net/vezeeta-web-reactjs/58776/_next/static/images/booking-icon.svg" />
              </div>
              <h3>حجزك مؤكد مع الدكتور</h3>
              <h5> حجزك مؤكد بمجرد اختيارك من المواعيد المتاحة للدكتور. </h5>
            </div>
            <div className="col-3">
              <div className="text-center">
                <img src="https://d1aovdz1i2nnak.cloudfront.net/vezeeta-web-reactjs/58776/_next/static/images/security-icon.svg"></img>
              </div>
              <h3>كل احتياجاتك على فيزيتا</h3>
              <h5>ابحث و احجز كشف مع دكتور في عيادة أو مستشفى.</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="rating ra">
        <div className="container">
          <div className="row pt-5 pb-5">
            <div className="col-lg-6 col-md-12">
              <div className="text-center customCategory">
                <h3>إختار التخصص وإحجز كشف دكتور</h3>
                <a href="#">دكتور جلدية</a>
                <a href="#" style={{ marginRight: "10px" }}>
                  دكتور اسنان
                </a>
                <a href="#" style={{ marginRight: "10px" }}>
                  دكتور نفسي
                </a>
                <a href="#" style={{ marginRight: "10px" }}>
                  دكتور اطفال وحديثي الولادة
                </a>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="text-center customCategory">
                <h3> المدينة وإحجز كشف دكتور</h3>
                <a href="#">عمان</a>
                <a href="#" style={{ marginRight: "10px" }}>
                  اربد
                </a>
                <a href="#" style={{ marginRight: "10px" }}>
                  الزرقا
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
