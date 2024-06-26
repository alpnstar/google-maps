import React, {useEffect, useState} from 'react';
import {setLatLng} from "../utils/common";
import {Wrapper} from "@googlemaps/react-wrapper";
import GoogleMapsMap from "../components/Map/GoogleMapsMap";
import GoogleMapsMarker from "../components/Map/GoogleMapsMarker";
import lastImg from "../../public/images/third_step_img.png";
import '../components/Map/map.scss';

const parkingTypes = [{
    title: 'Indoors',
    image:
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M16.6667 6.66667L11.6667 2.28334C11.2084 1.87338 10.615 1.64673 10.0001 1.64673C9.38513 1.64673 8.79176 1.87338 8.33341 2.28334L3.33341 6.66667C3.06872 6.9034 2.8575 7.1938 2.71381 7.51854C2.57012 7.84328 2.49726 8.19491 2.50008 8.55V15.8333C2.50008 16.4964 2.76347 17.1323 3.23231 17.6011C3.70115 18.0699 4.33704 18.3333 5.00008 18.3333H15.0001C15.6631 18.3333 16.299 18.0699 16.7678 17.6011C17.2367 17.1323 17.5001 16.4964 17.5001 15.8333V8.54167C17.5017 8.18797 17.4283 7.83795 17.2846 7.51474C17.141 7.19152 16.9304 6.90247 16.6667 6.66667ZM11.6667 16.6667H8.33341V12.5C8.33341 12.279 8.42121 12.067 8.57749 11.9107C8.73377 11.7545 8.94573 11.6667 9.16675 11.6667H10.8334C11.0544 11.6667 11.2664 11.7545 11.4227 11.9107C11.5789 12.067 11.6667 12.279 11.6667 12.5V16.6667ZM15.8334 15.8333C15.8334 16.0544 15.7456 16.2663 15.5893 16.4226C15.4331 16.5789 15.2211 16.6667 15.0001 16.6667H13.3334V12.5C13.3334 11.837 13.07 11.2011 12.6012 10.7322C12.1323 10.2634 11.4965 10 10.8334 10H9.16675C8.5037 10 7.86782 10.2634 7.39898 10.7322C6.93014 11.2011 6.66675 11.837 6.66675 12.5V16.6667H5.00008C4.77907 16.6667 4.5671 16.5789 4.41082 16.4226C4.25454 16.2663 4.16675 16.0544 4.16675 15.8333V8.54167C4.1669 8.42335 4.19224 8.30642 4.24109 8.19865C4.28995 8.09089 4.36119 7.99476 4.45008 7.91667L9.45008 3.54167C9.60215 3.40807 9.79766 3.33439 10.0001 3.33439C10.2025 3.33439 10.398 3.40807 10.5501 3.54167L15.5501 7.91667C15.639 7.99476 15.7102 8.09089 15.7591 8.19865C15.8079 8.30642 15.8333 8.42335 15.8334 8.54167V15.8333Z"
                fill="#7486AA"></path>
        </svg>,
}, {
    title: 'Outdoors',
    image:
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M16.6667 6.66667L11.6667 2.28334C11.2084 1.87338 10.615 1.64673 10.0001 1.64673C9.38513 1.64673 8.79176 1.87338 8.33341 2.28334L3.33341 6.66667C3.06872 6.9034 2.8575 7.1938 2.71381 7.51854C2.57012 7.84328 2.49726 8.19491 2.50008 8.55V15.8333C2.50008 16.4964 2.76347 17.1323 3.23231 17.6011C3.70115 18.0699 4.33704 18.3333 5.00008 18.3333H15.0001C15.6631 18.3333 16.299 18.0699 16.7678 17.6011C17.2367 17.1323 17.5001 16.4964 17.5001 15.8333V8.54167C17.5017 8.18797 17.4283 7.83795 17.2846 7.51474C17.141 7.19152 16.9304 6.90247 16.6667 6.66667ZM11.6667 16.6667H8.33341V12.5C8.33341 12.279 8.42121 12.067 8.57749 11.9107C8.73377 11.7545 8.94573 11.6667 9.16675 11.6667H10.8334C11.0544 11.6667 11.2664 11.7545 11.4227 11.9107C11.5789 12.067 11.6667 12.279 11.6667 12.5V16.6667ZM15.8334 15.8333C15.8334 16.0544 15.7456 16.2663 15.5893 16.4226C15.4331 16.5789 15.2211 16.6667 15.0001 16.6667H13.3334V12.5C13.3334 11.837 13.07 11.2011 12.6012 10.7322C12.1323 10.2634 11.4965 10 10.8334 10H9.16675C8.5037 10 7.86782 10.2634 7.39898 10.7322C6.93014 11.2011 6.66675 11.837 6.66675 12.5V16.6667H5.00008C4.77907 16.6667 4.5671 16.5789 4.41082 16.4226C4.25454 16.2663 4.16675 16.0544 4.16675 15.8333V8.54167C4.1669 8.42335 4.19224 8.30642 4.24109 8.19865C4.28995 8.09089 4.36119 7.99476 4.45008 7.91667L9.45008 3.54167C9.60215 3.40807 9.79766 3.33439 10.0001 3.33439C10.2025 3.33439 10.398 3.40807 10.5501 3.54167L15.5501 7.91667C15.639 7.99476 15.7102 8.09089 15.7591 8.19865C15.8079 8.30642 15.8333 8.42335 15.8334 8.54167V15.8333Z"
                fill="#7486AA"></path>
        </svg>,
}, {
    title: 'Villa',
    image:
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M16.6667 6.66667L11.6667 2.28334C11.2084 1.87338 10.615 1.64673 10.0001 1.64673C9.38513 1.64673 8.79176 1.87338 8.33341 2.28334L3.33341 6.66667C3.06872 6.9034 2.8575 7.1938 2.71381 7.51854C2.57012 7.84328 2.49726 8.19491 2.50008 8.55V15.8333C2.50008 16.4964 2.76347 17.1323 3.23231 17.6011C3.70115 18.0699 4.33704 18.3333 5.00008 18.3333H15.0001C15.6631 18.3333 16.299 18.0699 16.7678 17.6011C17.2367 17.1323 17.5001 16.4964 17.5001 15.8333V8.54167C17.5017 8.18797 17.4283 7.83795 17.2846 7.51474C17.141 7.19152 16.9304 6.90247 16.6667 6.66667ZM11.6667 16.6667H8.33341V12.5C8.33341 12.279 8.42121 12.067 8.57749 11.9107C8.73377 11.7545 8.94573 11.6667 9.16675 11.6667H10.8334C11.0544 11.6667 11.2664 11.7545 11.4227 11.9107C11.5789 12.067 11.6667 12.279 11.6667 12.5V16.6667ZM15.8334 15.8333C15.8334 16.0544 15.7456 16.2663 15.5893 16.4226C15.4331 16.5789 15.2211 16.6667 15.0001 16.6667H13.3334V12.5C13.3334 11.837 13.07 11.2011 12.6012 10.7322C12.1323 10.2634 11.4965 10 10.8334 10H9.16675C8.5037 10 7.86782 10.2634 7.39898 10.7322C6.93014 11.2011 6.66675 11.837 6.66675 12.5V16.6667H5.00008C4.77907 16.6667 4.5671 16.5789 4.41082 16.4226C4.25454 16.2663 4.16675 16.0544 4.16675 15.8333V8.54167C4.1669 8.42335 4.19224 8.30642 4.24109 8.19865C4.28995 8.09089 4.36119 7.99476 4.45008 7.91667L9.45008 3.54167C9.60215 3.40807 9.79766 3.33439 10.0001 3.33439C10.2025 3.33439 10.398 3.40807 10.5501 3.54167L15.5501 7.91667C15.639 7.99476 15.7102 8.09089 15.7591 8.19865C15.8079 8.30642 15.8333 8.42335 15.8334 8.54167V15.8333Z"
                fill="#7486AA"></path>
        </svg>,
}];
const carTypes = [{
    title: 'Sedan',
    image: <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_478_3549)">
            <path
                d="M30.0524 15.5501L30.062 15.5315L30.352 14.9673L30.0524 15.5501ZM30.0524 15.5501L30.0589 15.5699M30.0524 15.5501L30.0589 15.5699M30.0589 15.5699L30.4057 16.6291C30.4346 16.7186 30.4496 16.8118 30.4496 16.9055V18.7805C30.4496 19.2709 30.0525 19.668 29.5621 19.668H26.1766H26.1503L26.1354 19.6897C25.5525 20.5398 24.5744 21.0988 23.4684 21.0988C22.3625 21.0988 21.3844 20.5398 20.8015 19.6897L20.7866 19.668H20.7603H11.1768H11.1505L11.1356 19.6897C10.5527 20.5398 9.57463 21.0988 8.46865 21.0988C7.36268 21.0988 6.38463 20.5398 5.80172 19.6897L5.78683 19.668H5.76049H2.37499C2.03883 19.668 1.73155 19.4783 1.58124 19.1777L0.643756 17.3027C0.548897 17.113 0.525054 16.8961 0.576637 16.6904L0.57664 16.6903L1.01785 14.9279L1.01934 14.9282V14.9157V11.7499C1.01934 11.2596 1.41648 10.8625 1.90683 10.8625C3.49432 10.8625 4.6547 10.6663 5.59542 10.3745C6.53585 10.0827 7.25496 9.69571 7.95799 9.31725L7.958 9.31724C9.11957 8.69138 10.313 8.05 12.2192 8.05H12.2379H12.2379L15.6286 8.05469H15.6287H15.6445C16.3553 8.05469 17.0559 8.2936 17.619 8.72805L20.97 11.3143L20.9822 11.3238M30.0589 15.5699L20.9822 11.3238M20.9822 11.3238L20.9976 11.3247M20.9822 11.3238L20.9976 11.3247M20.9976 11.3247L27.8565 11.726C29.0171 11.7939 29.9865 12.5971 30.2683 13.7249L30.4236 14.3466C30.4757 14.5551 30.4502 14.7759 30.352 14.9673L20.9976 11.3247ZM12.7642 9.82497L12.6434 9.8248L12.7024 9.88397L11.912 11.277L11.8695 11.3519L11.9556 11.3517L17.9479 11.3371L18.0939 11.3367L17.9784 11.2475L16.5341 10.1325L16.534 10.1324C16.2798 9.93644 15.9644 9.82908 15.6439 9.82908H15.6288H15.6287L12.7642 9.82497ZM28.6746 17.793V17.0555V17.0476L28.6721 17.04L28.4694 16.4218L28.4581 16.3874H28.4219H28.1559C27.6655 16.3874 27.2684 15.9902 27.2684 15.4999C27.2684 15.0096 27.6655 14.6124 28.1559 14.6124H28.508H28.5385L28.5525 14.5853L28.6117 14.4705L28.6203 14.4537L28.6157 14.4354L28.5454 14.1554C28.4528 13.7844 28.1337 13.52 27.7522 13.4977L21.0661 13.1063L21.0661 13.1062L21.0631 13.1062L10.346 13.1302L10.3459 13.1302L10.3436 13.1302C10.028 13.1302 9.73627 12.9627 9.57707 12.6904C9.49881 12.5562 9.45711 12.4038 9.45614 12.2485C9.45517 12.0931 9.49495 11.9402 9.57151 11.8051C9.57151 11.8051 9.57152 11.8051 9.57152 11.8051L10.492 10.1821L10.557 10.0674L10.4323 10.1101C9.87115 10.3021 9.36366 10.5748 8.79827 10.8792C7.47188 11.5933 5.85487 12.4634 2.84123 12.6141L2.79373 12.6164V12.664V14.0931V14.1431H2.84373H3.31247C3.80282 14.1431 4.19996 14.5402 4.19996 15.0306C4.19996 15.5209 3.80282 15.9181 3.31247 15.9181H2.63807H2.59902L2.58956 15.9559L2.38272 16.7845L2.37825 16.8024L2.38651 16.8189L2.90975 17.8654L2.92357 17.893H2.95447H5.18803H5.23766L5.23803 17.8434C5.2513 16.0726 6.69501 14.6364 8.46865 14.6364C10.2423 14.6364 11.686 16.0732 11.6993 17.8434L11.6996 17.893H11.7493H20.1878H20.2375L20.2378 17.8434C20.2511 16.0726 21.6948 14.6364 23.4684 14.6364C25.2421 14.6364 26.6858 16.0732 26.6991 17.8434L26.6994 17.893H26.7491H28.6246V17.8436H28.6746V17.843V17.793ZM7.01242 17.8676C7.01242 18.6704 7.66585 19.3239 8.46865 19.3239C9.27145 19.3239 9.92488 18.6704 9.92488 17.8676C9.92488 17.0648 9.27145 16.4114 8.46865 16.4114C7.66585 16.4114 7.01242 17.0648 7.01242 17.8676ZM22.0122 17.8676C22.0122 18.6704 22.6656 19.3239 23.4684 19.3239C24.2712 19.3239 24.9247 18.6704 24.9247 17.8676C24.9247 17.0648 24.2712 16.4114 23.4684 16.4114C22.6656 16.4114 22.0122 17.0648 22.0122 17.8676Z"
                fill="#3262FF" stroke="white" strokeWidth="0.1"></path>
        </g>
        <defs>
            <clipPath id="clip0_478_3549">
                <rect width="30" height="30" fill="white" transform="translate(0.5)"></rect>
            </clipPath>
        </defs>
    </svg>,

}, {
    title: 'SUV',
    image: <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_478_3549)">
            <path
                d="M30.0524 15.5501L30.062 15.5315L30.352 14.9673L30.0524 15.5501ZM30.0524 15.5501L30.0589 15.5699M30.0524 15.5501L30.0589 15.5699M30.0589 15.5699L30.4057 16.6291C30.4346 16.7186 30.4496 16.8118 30.4496 16.9055V18.7805C30.4496 19.2709 30.0525 19.668 29.5621 19.668H26.1766H26.1503L26.1354 19.6897C25.5525 20.5398 24.5744 21.0988 23.4684 21.0988C22.3625 21.0988 21.3844 20.5398 20.8015 19.6897L20.7866 19.668H20.7603H11.1768H11.1505L11.1356 19.6897C10.5527 20.5398 9.57463 21.0988 8.46865 21.0988C7.36268 21.0988 6.38463 20.5398 5.80172 19.6897L5.78683 19.668H5.76049H2.37499C2.03883 19.668 1.73155 19.4783 1.58124 19.1777L0.643756 17.3027C0.548897 17.113 0.525054 16.8961 0.576637 16.6904L0.57664 16.6903L1.01785 14.9279L1.01934 14.9282V14.9157V11.7499C1.01934 11.2596 1.41648 10.8625 1.90683 10.8625C3.49432 10.8625 4.6547 10.6663 5.59542 10.3745C6.53585 10.0827 7.25496 9.69571 7.95799 9.31725L7.958 9.31724C9.11957 8.69138 10.313 8.05 12.2192 8.05H12.2379H12.2379L15.6286 8.05469H15.6287H15.6445C16.3553 8.05469 17.0559 8.2936 17.619 8.72805L20.97 11.3143L20.9822 11.3238M30.0589 15.5699L20.9822 11.3238M20.9822 11.3238L20.9976 11.3247M20.9822 11.3238L20.9976 11.3247M20.9976 11.3247L27.8565 11.726C29.0171 11.7939 29.9865 12.5971 30.2683 13.7249L30.4236 14.3466C30.4757 14.5551 30.4502 14.7759 30.352 14.9673L20.9976 11.3247ZM12.7642 9.82497L12.6434 9.8248L12.7024 9.88397L11.912 11.277L11.8695 11.3519L11.9556 11.3517L17.9479 11.3371L18.0939 11.3367L17.9784 11.2475L16.5341 10.1325L16.534 10.1324C16.2798 9.93644 15.9644 9.82908 15.6439 9.82908H15.6288H15.6287L12.7642 9.82497ZM28.6746 17.793V17.0555V17.0476L28.6721 17.04L28.4694 16.4218L28.4581 16.3874H28.4219H28.1559C27.6655 16.3874 27.2684 15.9902 27.2684 15.4999C27.2684 15.0096 27.6655 14.6124 28.1559 14.6124H28.508H28.5385L28.5525 14.5853L28.6117 14.4705L28.6203 14.4537L28.6157 14.4354L28.5454 14.1554C28.4528 13.7844 28.1337 13.52 27.7522 13.4977L21.0661 13.1063L21.0661 13.1062L21.0631 13.1062L10.346 13.1302L10.3459 13.1302L10.3436 13.1302C10.028 13.1302 9.73627 12.9627 9.57707 12.6904C9.49881 12.5562 9.45711 12.4038 9.45614 12.2485C9.45517 12.0931 9.49495 11.9402 9.57151 11.8051C9.57151 11.8051 9.57152 11.8051 9.57152 11.8051L10.492 10.1821L10.557 10.0674L10.4323 10.1101C9.87115 10.3021 9.36366 10.5748 8.79827 10.8792C7.47188 11.5933 5.85487 12.4634 2.84123 12.6141L2.79373 12.6164V12.664V14.0931V14.1431H2.84373H3.31247C3.80282 14.1431 4.19996 14.5402 4.19996 15.0306C4.19996 15.5209 3.80282 15.9181 3.31247 15.9181H2.63807H2.59902L2.58956 15.9559L2.38272 16.7845L2.37825 16.8024L2.38651 16.8189L2.90975 17.8654L2.92357 17.893H2.95447H5.18803H5.23766L5.23803 17.8434C5.2513 16.0726 6.69501 14.6364 8.46865 14.6364C10.2423 14.6364 11.686 16.0732 11.6993 17.8434L11.6996 17.893H11.7493H20.1878H20.2375L20.2378 17.8434C20.2511 16.0726 21.6948 14.6364 23.4684 14.6364C25.2421 14.6364 26.6858 16.0732 26.6991 17.8434L26.6994 17.893H26.7491H28.6246V17.8436H28.6746V17.843V17.793ZM7.01242 17.8676C7.01242 18.6704 7.66585 19.3239 8.46865 19.3239C9.27145 19.3239 9.92488 18.6704 9.92488 17.8676C9.92488 17.0648 9.27145 16.4114 8.46865 16.4114C7.66585 16.4114 7.01242 17.0648 7.01242 17.8676ZM22.0122 17.8676C22.0122 18.6704 22.6656 19.3239 23.4684 19.3239C24.2712 19.3239 24.9247 18.6704 24.9247 17.8676C24.9247 17.0648 24.2712 16.4114 23.4684 16.4114C22.6656 16.4114 22.0122 17.0648 22.0122 17.8676Z"
                fill="#3262FF" stroke="white" strokeWidth="0.1"></path>
        </g>
        <defs>
            <clipPath id="clip0_478_3549">
                <rect width="30" height="30" fill="white" transform="translate(0.5)"></rect>
            </clipPath>
        </defs>
    </svg>,

}, {
    title: 'Pick-Up',
    image: <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_478_3549)">
            <path
                d="M30.0524 15.5501L30.062 15.5315L30.352 14.9673L30.0524 15.5501ZM30.0524 15.5501L30.0589 15.5699M30.0524 15.5501L30.0589 15.5699M30.0589 15.5699L30.4057 16.6291C30.4346 16.7186 30.4496 16.8118 30.4496 16.9055V18.7805C30.4496 19.2709 30.0525 19.668 29.5621 19.668H26.1766H26.1503L26.1354 19.6897C25.5525 20.5398 24.5744 21.0988 23.4684 21.0988C22.3625 21.0988 21.3844 20.5398 20.8015 19.6897L20.7866 19.668H20.7603H11.1768H11.1505L11.1356 19.6897C10.5527 20.5398 9.57463 21.0988 8.46865 21.0988C7.36268 21.0988 6.38463 20.5398 5.80172 19.6897L5.78683 19.668H5.76049H2.37499C2.03883 19.668 1.73155 19.4783 1.58124 19.1777L0.643756 17.3027C0.548897 17.113 0.525054 16.8961 0.576637 16.6904L0.57664 16.6903L1.01785 14.9279L1.01934 14.9282V14.9157V11.7499C1.01934 11.2596 1.41648 10.8625 1.90683 10.8625C3.49432 10.8625 4.6547 10.6663 5.59542 10.3745C6.53585 10.0827 7.25496 9.69571 7.95799 9.31725L7.958 9.31724C9.11957 8.69138 10.313 8.05 12.2192 8.05H12.2379H12.2379L15.6286 8.05469H15.6287H15.6445C16.3553 8.05469 17.0559 8.2936 17.619 8.72805L20.97 11.3143L20.9822 11.3238M30.0589 15.5699L20.9822 11.3238M20.9822 11.3238L20.9976 11.3247M20.9822 11.3238L20.9976 11.3247M20.9976 11.3247L27.8565 11.726C29.0171 11.7939 29.9865 12.5971 30.2683 13.7249L30.4236 14.3466C30.4757 14.5551 30.4502 14.7759 30.352 14.9673L20.9976 11.3247ZM12.7642 9.82497L12.6434 9.8248L12.7024 9.88397L11.912 11.277L11.8695 11.3519L11.9556 11.3517L17.9479 11.3371L18.0939 11.3367L17.9784 11.2475L16.5341 10.1325L16.534 10.1324C16.2798 9.93644 15.9644 9.82908 15.6439 9.82908H15.6288H15.6287L12.7642 9.82497ZM28.6746 17.793V17.0555V17.0476L28.6721 17.04L28.4694 16.4218L28.4581 16.3874H28.4219H28.1559C27.6655 16.3874 27.2684 15.9902 27.2684 15.4999C27.2684 15.0096 27.6655 14.6124 28.1559 14.6124H28.508H28.5385L28.5525 14.5853L28.6117 14.4705L28.6203 14.4537L28.6157 14.4354L28.5454 14.1554C28.4528 13.7844 28.1337 13.52 27.7522 13.4977L21.0661 13.1063L21.0661 13.1062L21.0631 13.1062L10.346 13.1302L10.3459 13.1302L10.3436 13.1302C10.028 13.1302 9.73627 12.9627 9.57707 12.6904C9.49881 12.5562 9.45711 12.4038 9.45614 12.2485C9.45517 12.0931 9.49495 11.9402 9.57151 11.8051C9.57151 11.8051 9.57152 11.8051 9.57152 11.8051L10.492 10.1821L10.557 10.0674L10.4323 10.1101C9.87115 10.3021 9.36366 10.5748 8.79827 10.8792C7.47188 11.5933 5.85487 12.4634 2.84123 12.6141L2.79373 12.6164V12.664V14.0931V14.1431H2.84373H3.31247C3.80282 14.1431 4.19996 14.5402 4.19996 15.0306C4.19996 15.5209 3.80282 15.9181 3.31247 15.9181H2.63807H2.59902L2.58956 15.9559L2.38272 16.7845L2.37825 16.8024L2.38651 16.8189L2.90975 17.8654L2.92357 17.893H2.95447H5.18803H5.23766L5.23803 17.8434C5.2513 16.0726 6.69501 14.6364 8.46865 14.6364C10.2423 14.6364 11.686 16.0732 11.6993 17.8434L11.6996 17.893H11.7493H20.1878H20.2375L20.2378 17.8434C20.2511 16.0726 21.6948 14.6364 23.4684 14.6364C25.2421 14.6364 26.6858 16.0732 26.6991 17.8434L26.6994 17.893H26.7491H28.6246V17.8436H28.6746V17.843V17.793ZM7.01242 17.8676C7.01242 18.6704 7.66585 19.3239 8.46865 19.3239C9.27145 19.3239 9.92488 18.6704 9.92488 17.8676C9.92488 17.0648 9.27145 16.4114 8.46865 16.4114C7.66585 16.4114 7.01242 17.0648 7.01242 17.8676ZM22.0122 17.8676C22.0122 18.6704 22.6656 19.3239 23.4684 19.3239C24.2712 19.3239 24.9247 18.6704 24.9247 17.8676C24.9247 17.0648 24.2712 16.4114 23.4684 16.4114C22.6656 16.4114 22.0122 17.0648 22.0122 17.8676Z"
                fill="#3262FF" stroke="white" strokeWidth="0.1"></path>
        </g>
        <defs>
            <clipPath id="clip0_478_3549">
                <rect width="30" height="30" fill="white" transform="translate(0.5)"></rect>
            </clipPath>
        </defs>
    </svg>,

}, {
    title: 'Sportcar',
    image: <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_478_3549)">
            <path
                d="M30.0524 15.5501L30.062 15.5315L30.352 14.9673L30.0524 15.5501ZM30.0524 15.5501L30.0589 15.5699M30.0524 15.5501L30.0589 15.5699M30.0589 15.5699L30.4057 16.6291C30.4346 16.7186 30.4496 16.8118 30.4496 16.9055V18.7805C30.4496 19.2709 30.0525 19.668 29.5621 19.668H26.1766H26.1503L26.1354 19.6897C25.5525 20.5398 24.5744 21.0988 23.4684 21.0988C22.3625 21.0988 21.3844 20.5398 20.8015 19.6897L20.7866 19.668H20.7603H11.1768H11.1505L11.1356 19.6897C10.5527 20.5398 9.57463 21.0988 8.46865 21.0988C7.36268 21.0988 6.38463 20.5398 5.80172 19.6897L5.78683 19.668H5.76049H2.37499C2.03883 19.668 1.73155 19.4783 1.58124 19.1777L0.643756 17.3027C0.548897 17.113 0.525054 16.8961 0.576637 16.6904L0.57664 16.6903L1.01785 14.9279L1.01934 14.9282V14.9157V11.7499C1.01934 11.2596 1.41648 10.8625 1.90683 10.8625C3.49432 10.8625 4.6547 10.6663 5.59542 10.3745C6.53585 10.0827 7.25496 9.69571 7.95799 9.31725L7.958 9.31724C9.11957 8.69138 10.313 8.05 12.2192 8.05H12.2379H12.2379L15.6286 8.05469H15.6287H15.6445C16.3553 8.05469 17.0559 8.2936 17.619 8.72805L20.97 11.3143L20.9822 11.3238M30.0589 15.5699L20.9822 11.3238M20.9822 11.3238L20.9976 11.3247M20.9822 11.3238L20.9976 11.3247M20.9976 11.3247L27.8565 11.726C29.0171 11.7939 29.9865 12.5971 30.2683 13.7249L30.4236 14.3466C30.4757 14.5551 30.4502 14.7759 30.352 14.9673L20.9976 11.3247ZM12.7642 9.82497L12.6434 9.8248L12.7024 9.88397L11.912 11.277L11.8695 11.3519L11.9556 11.3517L17.9479 11.3371L18.0939 11.3367L17.9784 11.2475L16.5341 10.1325L16.534 10.1324C16.2798 9.93644 15.9644 9.82908 15.6439 9.82908H15.6288H15.6287L12.7642 9.82497ZM28.6746 17.793V17.0555V17.0476L28.6721 17.04L28.4694 16.4218L28.4581 16.3874H28.4219H28.1559C27.6655 16.3874 27.2684 15.9902 27.2684 15.4999C27.2684 15.0096 27.6655 14.6124 28.1559 14.6124H28.508H28.5385L28.5525 14.5853L28.6117 14.4705L28.6203 14.4537L28.6157 14.4354L28.5454 14.1554C28.4528 13.7844 28.1337 13.52 27.7522 13.4977L21.0661 13.1063L21.0661 13.1062L21.0631 13.1062L10.346 13.1302L10.3459 13.1302L10.3436 13.1302C10.028 13.1302 9.73627 12.9627 9.57707 12.6904C9.49881 12.5562 9.45711 12.4038 9.45614 12.2485C9.45517 12.0931 9.49495 11.9402 9.57151 11.8051C9.57151 11.8051 9.57152 11.8051 9.57152 11.8051L10.492 10.1821L10.557 10.0674L10.4323 10.1101C9.87115 10.3021 9.36366 10.5748 8.79827 10.8792C7.47188 11.5933 5.85487 12.4634 2.84123 12.6141L2.79373 12.6164V12.664V14.0931V14.1431H2.84373H3.31247C3.80282 14.1431 4.19996 14.5402 4.19996 15.0306C4.19996 15.5209 3.80282 15.9181 3.31247 15.9181H2.63807H2.59902L2.58956 15.9559L2.38272 16.7845L2.37825 16.8024L2.38651 16.8189L2.90975 17.8654L2.92357 17.893H2.95447H5.18803H5.23766L5.23803 17.8434C5.2513 16.0726 6.69501 14.6364 8.46865 14.6364C10.2423 14.6364 11.686 16.0732 11.6993 17.8434L11.6996 17.893H11.7493H20.1878H20.2375L20.2378 17.8434C20.2511 16.0726 21.6948 14.6364 23.4684 14.6364C25.2421 14.6364 26.6858 16.0732 26.6991 17.8434L26.6994 17.893H26.7491H28.6246V17.8436H28.6746V17.843V17.793ZM7.01242 17.8676C7.01242 18.6704 7.66585 19.3239 8.46865 19.3239C9.27145 19.3239 9.92488 18.6704 9.92488 17.8676C9.92488 17.0648 9.27145 16.4114 8.46865 16.4114C7.66585 16.4114 7.01242 17.0648 7.01242 17.8676ZM22.0122 17.8676C22.0122 18.6704 22.6656 19.3239 23.4684 19.3239C24.2712 19.3239 24.9247 18.6704 24.9247 17.8676C24.9247 17.0648 24.2712 16.4114 23.4684 16.4114C22.6656 16.4114 22.0122 17.0648 22.0122 17.8676Z"
                fill="#3262FF" stroke="white" strokeWidth="0.1"></path>
        </g>
        <defs>
            <clipPath id="clip0_478_3549">
                <rect width="30" height="30" fill="white" transform="translate(0.5)"></rect>
            </clipPath>
        </defs>
    </svg>,

}]
const qualitiesTemplates = ['High pressure wash, shampooing', 'Tire polish', 'Interior detailing and vacuuming', 'Wax coating'];
const washTypes = ['Water', 'Interior', 'Exterior',]
const packages = [{
    name: 'Silver',
    price: 62,
    time: '30-40 min',
    types: [washTypes[0], washTypes[1], washTypes[2]],
    qualities: [qualitiesTemplates[0]],
}, {
    name: 'Gold',
    price: 62,
    time: '30-40 min',
    types: [washTypes[0], washTypes[1], washTypes[2]],
    qualities: [qualitiesTemplates[0]],
}, {
    name: 'Platinum',
    price: 62,
    time: '30-40 min',
    types: [washTypes[0], washTypes[1], washTypes[2]],
    qualities: [qualitiesTemplates[0]],
}]

const Map = () => {
    const [step, setStep] = useState(1);
    const [markerPos, setMarkerPos] = useState();
    const [addresses, setAddresses] = useState([]);
    const [displayAddresses, setDisplayAddresses] = useState(false);
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [coordValues, setCoordValues] = useState({
        lat: '',
        lng: '',
    });

    const [currentParkingType, setCurrentParkingType] = useState();
    const [currentCarType, setCurrentCarType] = useState();
    const [currentPackage, setCurrentPackage] = useState();

    function render(status) {
        return <h1>{status}</h1>;
    }

    function handleChangeCoord({target}) {
        setCoordValues(prev => ({
            ...prev,
            [target.name]: target.value,
        }))
    }

    function handleChangeAddress({target}) {
        setAddress(target.value);
    }

    function setPosition({latLng}) {
        setMarkerPos(setLatLng(latLng.lat(), latLng.lng()))
        setCoordValues(setLatLng(latLng.lat(), latLng.lng()))
        setAddresses([]);

    }
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords}) => {
            setCoordValues({
                lat: coords.latitude,
                lng: coords.longitude,
            })
        })
    }, []);
    return (
        <article className="map">
            <Wrapper apiKey={"AIzaSyDAbxRYrt3BHfbm79UDudSK-k4eayEiUK8"} render={render}>
                <GoogleMapsMap
                    className="map__map"
                    coordValues={coordValues}
                    setCoordValues={setCoordValues}
                    address={address}
                    setAddress={setAddress}
                    setAddresses={setAddresses}
                    setPosition={setPosition}>
                    <GoogleMapsMarker position={markerPos}/>
                </GoogleMapsMap>
            </Wrapper>
            <aside className="map__side">
                <form onSubmit={(e) => e.preventDefault()} className="map__form">
                    <div className="map__form-inner">
                        {step === 1 ?
                            <>

                                <div className="map__form-section">
                                    <h2 className="map__form-title">Add parking details</h2>
                                    {/*<input className="map__form-input" type="text" placeholder="Enter latitude"
                                           name="lat"
                                           value={coordValues.lat}
                                           onChange={handleChangeCoord}/>
                                    <input className="map__form-input" type="text" placeholder="Enter longitude"
                                           name="lng"
                                           value={coordValues.lng}
                                           onChange={handleChangeCoord}/>*/}
                                    <div className="map__address-select">
                                        <input
                                            onFocus={() => setDisplayAddresses(true)}
                                            className="map__form-input" type="text" placeholder="Enter address"
                                            name="address"
                                            value={address}
                                            onChange={handleChangeAddress}/>
                                        {!!addresses.length && displayAddresses && !!address &&
                                            <div className="map__form-addresses-wrapper">
                                                <ul>
                                                    {addresses.map(item =>
                                                        <li key={Math.random()} style={{cursor: 'pointer'}}
                                                            onClick={(e) => {
                                                                setAddress(item.formatted_address);
                                                                const {location} = item.geometry;
                                                                setMarkerPos(setLatLng(location.lat(), location.lng()))
                                                                setCoordValues(setLatLng(location.lat(), location.lng()))
                                                                setDisplayAddresses(false);
                                                            }}
                                                        >
                                                            {item.formatted_address}
                                                        </li>)}

                                                </ul>
                                            </div>
                                        }

                                    </div>
                                    <h3>Type of parking</h3>
                                    <ul className="map__select">
                                        {parkingTypes.map((item, index) => <li
                                            key={index}
                                            onClick={() => setCurrentParkingType(item.title)}
                                            className={`map__select-option ${currentParkingType === item.title ? 'map__select-option--active' : ''}`}>{item.image}{item.title}</li>)}
                                    </ul>

                                    <h3>Any additional parking notes</h3>
                                    <textarea className="map__form-input map__form-input--area" type="text"
                                              placeholder="Any additional information"
                                              name="notes"/>
                                </div>
                                <div className="map__form-section">
                                    <h2 className="map__form-title">Choose your vehicle</h2>
                                    <ul className="map__select map__select--wrap">
                                        {carTypes.map((item,index) => <li
                                            key={index}
                                            onClick={() => setCurrentCarType(item.title)}
                                            className={`map__select-option ${currentCarType === item.title ? 'map__select-option--active' : ''}`}>{item.image}{item.title}</li>)}
                                    </ul>
                                    <div className="map__button-wrapper">

                                        <button onClick={() => setStep(step + 1)} type="button"
                                                className=" map__button map__button--next">
                                            Next
                                        </button>

                                    </div>
                                </div>
                            </> :
                            step === 2 ?
                                <>
                                    <div className="map__form-section">
                                        <h2 className="map__form-title">Phone number</h2>
                                        <input className="map__form-input" value={phone}
                                               onChange={(({target}) => setPhone(target.value))} type="tel"
                                               placeholder="Enter your number"
                                        />
                                    </div>
                                    <div className="map__form-section map__form-section--last">
                                        <h2 className="map__form-title">Select a wash type</h2>
                                        <ul className="map__packages">
                                            {packages.map((item) => (
                                                <li
                                                    onClick={() => setCurrentPackage(item.name)}
                                                    className={`map__packages-item ${currentPackage === item.name ? 'map__packages-item--active' : ''}`}>
                                                    <div className="map__packages-item-info-main">
                                                        <div className="map__packages-item-info-main-section-1">
                                                            <span className="map__packages-name">{item.name}</span>
                                                            <span
                                                                className="map__packages-price">AED {item.price}</span>
                                                        </div>
                                                        <div className="map__packages-item-info-main-section-2">
                                                            <div className="map__packages-time">{item.time}</div>
                                                            <ul className="map__packages-types">
                                                                {item.types.map(item => <li>{item}</li>)}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="map__packages-item-info-secondary">
                                                        <ul className="map__packages-qualities">
                                                            <li className="map__packages-qualities-item">High pressure
                                                                wash,
                                                                shampooing
                                                            </li>
                                                        </ul>

                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="map__button-wrapper">
                                            <button onClick={() => setStep(step - 1)} type="button"
                                                    className="map__button map__button--back map__button">
                                                Back
                                            </button>
                                            <button onClick={() => setStep(step + 1)} type="button"
                                                    className=" map__button map__button--next">
                                                Next
                                            </button>

                                        </div>
                                    </div>
                                </> : step === 3 ? <div className="map__form-section map__form-section--last">
                                    <div className="map__form-end">
                                        <div className="map__form-end-content">
                                            <img src={lastImg} alt=""/>
                                            <h2>Your order has been received!</h2>
                                            <p> Our operator will contact you to find the best time and date for your
                                                car wash </p>
                                            <p> You will receive an email confirmation with your order details
                                                shortly </p>
                                            <button onClick={() => setStep(1)} className="main_button">
                                                Follow the order
                                            </button>
                                            <button onClick={() => setStep(1)}
                                                    className="map__button map__button--back map__button--max-width">
                                                Place another order
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => setStep(1)}
                                            className="map__form-end-learn_more map__button map__button--back map__button--max-width map__button--black">
                                            Learn more about AquaShine
                                        </button>

                                    </div>
                                </div> : ''
                        }
                    </div>
                </form>
            </aside>

        </article>


    );
};

export default Map;