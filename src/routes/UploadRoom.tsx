import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPgae from "../components/ProtectedPage";

export default function UploadRoom() {
  useHostOnlyPage();
  return (
    <ProtectedPgae>
      <h1>Upload</h1>
    </ProtectedPgae>
  );
}
