/* Supabase 连接配置。
   这两个值是「公开」的（anon key 本来就随前端发布），写权限由数据库的行级策略限制。 */
window.SUPABASE_CONFIG = {
  url: "",          // 例：https://abcdefghijkl.supabase.co
  anonKey: "",      // 例：eyJhbGciOi...
  bucket: "album"   // 照片和音乐的存储桶
};
