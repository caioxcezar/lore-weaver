using Imageflow.Fluent;

namespace LoreWeaver.Shared;

public static class ImageConverter
{
    public static async Task<byte[]?> ConvertToWebP(string base64)
    {
        base64 = base64.Replace("data:image/webp;base64,", "");
        base64 = base64.Replace("data:image/jpeg;base64,", "");
        base64 = base64.Replace("data:image/png;base64,", "");
            
        var image = Convert.FromBase64String(base64);
        using (var imageJob = new ImageJob())
        {
            var decoded = imageJob.Decode(image);
            var result = await decoded.EncodeToBytes(new WebPLosslessEncoder()).Finish().InProcessAsync();
            if (result.First == null) return null;
            var firstValue = result.First.TryGetBytes();
            return firstValue?.ToArray();
        }
    }

    public static string ConvertToBase64(byte[] image)
    {
        var base64 = Convert.ToBase64String(image);
        return $"data:image/webp;base64,{base64}";
    }
}