import { useCallback, useContext } from "react";
import { SupabaseContext } from "../context/contexts";
import { UPLOAD_BUCKET } from "../config/upload";
import { useQuery } from "@tanstack/react-query";

/**
 * Custom hook to fetch an image from a Supabase storage bucket.
 *
 * @param {string} imagePath - The path of the image in the storage bucket.
 * @param {boolean} [inView=true] - Flag to determine if the image should be fetched based on visibility.
 * @returns {Object} An object containing the image URL and fetching status.
 * @returns {string|null} return.image - The URL of the fetched image or null if not fetched yet.
 * @returns {boolean} return.isFetching - The status indicating if the image is currently being fetched.
 */

const useFetchImage = (imagePath, inView = true) => {
    const supabase = useContext(SupabaseContext)

    const fetchImage = useCallback(async () => {
        const { data: exists } = await supabase.storage.from(UPLOAD_BUCKET).exists(imagePath);
        return exists ? supabase.storage.from(UPLOAD_BUCKET).getPublicUrl(imagePath).data.publicUrl : null;
    }, []);

    const { data: image, isFetching } = useQuery({
        queryKey: ["image", imagePath],
        queryFn: fetchImage,
        enabled: inView
    });

    return { image, isFetching }
}

export default useFetchImage;