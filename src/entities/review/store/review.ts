import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { IGetReviewResponse } from "../types/responses/GetReview";
import { reviewService } from "../services/review";
import { IGetReviewRequest } from "../types/requests/GetReview";
import { IPostReviewRequest } from "../types/requests/PostReview";

import { Bounce, toast as notify } from "react-toastify";
import { SuccessNotification } from "../components/SuccessNotification";
import Success from "../components/SuccessNotification/assets/Success";
import Error from "../components/SuccessNotification/assets/Error";

type State = {
  isLoading: boolean;
  reviews: IGetReviewResponse;
  error: string;
};

type Actions = {
  getReviews: (searchParams?: IGetReviewRequest) => Promise<void>;
  postReview: (body: IPostReviewRequest) => Promise<void>;
};

export const useReviewsStore = create<State & Actions>()(
  immer((set) => ({
    isLoading: true,
    reviews: { count: 0, next: null, previous: null, results: [] },
    error: "",

    getReviews: async (searchParams: IGetReviewRequest = {}) => {
      try {
        set({ isLoading: true, error: "" });

        const reviews = await reviewService.get(searchParams);

        set({ reviews });
      } catch {
        set((state) => {
          state.reviews = { count: 0, next: null, previous: null, results: [] };
          state.error = "Unexpected error occured. Please try again later";
        });
      } finally {
        set({ isLoading: false });
      }
    },
    postReview: async (body: IPostReviewRequest) => {
      try {
        set({ isLoading: true, error: "" });

        await reviewService.post(body);

        notify(SuccessNotification({
          text: 'Review succesfully added!',
          Icon: Success
        }), {
          position: "bottom-center",
          autoClose: 5000,
          closeButton: false,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
          icon: false,
          style: {
            background: "#4DB930",
            color: "#fff",
            padding: "0",
            minHeight: 'auto'
          },
        });
      } catch {
        set((state) => {
          state.reviews = { count: 0, next: null, previous: null, results: [] };
          state.error = "Unexpected error occured. Please try again later";
        });
        notify(SuccessNotification({
          text: 'Failed to add review!',
          Icon: Error
        }), {
          position: "bottom-center",
          autoClose: 5000,
          closeButton: false,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
          icon: false,
          style: {
            background: "#B93030",
            color: "#fff",
            padding: "0",
            minHeight: 'auto'
          },
        });
      } finally {
        set({ isLoading: false });
      }
    },

    putReview: async (id: string, body: IPostReviewRequest) => {
      try {
        set({ isLoading: true, error: "" });

        await reviewService.put(id, body);

        notify(SuccessNotification({
          text: 'Review succesfully updated!',
          Icon: Success
        }), {
          position: "bottom-center",
          autoClose: 5000,
          closeButton: false,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
          icon: false,
          style: {
            background: "#4DB930",
            color: "#fff",
            padding: "0",
            minHeight: 'auto'
          },
        });
      } catch {
        set((state) => {
          state.reviews = { count: 0, next: null, previous: null, results: [] };
          state.error = "Unexpected error occured. Please try again later";
        });
        notify(SuccessNotification({
          text: 'Failed to update review!',
          Icon: Error
        }), {
          position: "bottom-center",
          autoClose: 5000,
          closeButton: false,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
          icon: false,
          style: {
            background: "#B93030",
            color: "#fff",
            padding: "0",
            minHeight: 'auto'
          },
        });
      } finally {
        set({ isLoading: false });
      }
    },
  }))
);
