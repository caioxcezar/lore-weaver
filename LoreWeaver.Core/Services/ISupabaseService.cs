using Supabase;

namespace LoreWeaver.Core.Services;

public interface ISupabaseService
{
    public Client client { set; get; }
}