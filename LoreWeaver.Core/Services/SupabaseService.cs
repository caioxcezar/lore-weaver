using Supabase;

namespace LoreWeaver.Core.Services;

public class SupabaseService : ISupabaseService
{
    public Client client { set; get; }

    public SupabaseService()
    {
        var url = Environment.GetEnvironmentVariable("SUPABASE_URL")!;
        var key = Environment.GetEnvironmentVariable("SUPABASE_KEY")!;
        var options = new SupabaseOptions
        {
            AutoRefreshToken = true,
            AutoConnectRealtime = true,
            // SessionHandler = new SupabaseSessionHandler() <-- This must be implemented by the developer
        };

        client = new Client(url, key, options);
    }
}