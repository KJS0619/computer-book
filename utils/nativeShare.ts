import { Capacitor } from "@capacitor/core";

// 앱(Capacitor) 안에서 실행 중인지. 웹 브라우저에서는 항상 false.
export function isNativeApp(): boolean {
  return typeof window !== "undefined" && Capacitor.isNativePlatform();
}

// 앱 WebView 는 <a download> 가 동작하지 않으므로, 텍스트 파일을 임시 파일로 쓰고 공유 시트(저장·전송)를 띄운다.
export async function shareTextFileNative(text: string, fileName: string): Promise<void> {
  const [{ Filesystem, Directory, Encoding }, { Share }] = await Promise.all([
    import("@capacitor/filesystem"),
    import("@capacitor/share"),
  ]);
  const { uri } = await Filesystem.writeFile({
    path: fileName,
    data: text,
    directory: Directory.Cache,
    encoding: Encoding.UTF8,
  });
  try {
    await Share.share({ title: fileName, files: [uri], dialogTitle: fileName });
  } catch (e) {
    // 사용자가 공유 시트를 닫은 경우는 오류로 취급하지 않는다.
    if (!/cancel/i.test(String(e))) throw e;
  }
}
